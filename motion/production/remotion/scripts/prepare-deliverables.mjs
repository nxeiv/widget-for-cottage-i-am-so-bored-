import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const outDir = resolve(root, "out");
const sourceWav = resolve(root, "public/audio/cottage-original-bed.wav");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    ...options,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      command + " failed (exit " + result.status + "):\n" +
      (result.stderr || result.stdout || "No process output"),
    );
  }
  return { stdout: result.stdout || "", stderr: result.stderr || "" };
}

function probe(file) {
  const { stdout } = run("ffprobe", [
    "-v", "error",
    "-show_entries",
    "format=duration:stream=codec_type,codec_name,width,height,avg_frame_rate,r_frame_rate,sample_rate,channels",
    "-of", "json",
    file,
  ]);
  return JSON.parse(stdout);
}

function numericRate(value) {
  const [numerator, denominator] = String(value || "0/1").split("/").map(Number);
  return denominator ? numerator / denominator : 0;
}

function assertNear(actual, expected, tolerance, label) {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    throw new Error(label + ": expected " + expected + " ± " + tolerance + ", got " + actual);
  }
}

function validateVideo(fileName, width, height, fps) {
  const file = resolve(outDir, fileName);
  const metadata = probe(file);
  const video = metadata.streams?.find((stream) => stream.codec_type === "video");
  const audio = metadata.streams?.find((stream) => stream.codec_type === "audio");
  if (!video) throw new Error(fileName + ": missing video stream");
  if (!audio) throw new Error(fileName + ": missing embedded audio stream");
  if (video.width !== width || video.height !== height) {
    throw new Error(fileName + ": expected " + width + "x" + height +
      ", got " + video.width + "x" + video.height);
  }
  const actualFps = numericRate(video.avg_frame_rate || video.r_frame_rate);
  assertNear(actualFps, fps, 0.01, fileName + " frame rate");
  const duration = Number(metadata.format?.duration);
  assertNear(duration, 45, 0.15, fileName + " duration");
  if (audio.codec_name !== "aac") {
    throw new Error(fileName + ": expected AAC audio, got " + audio.codec_name);
  }

  return {
    file: fileName,
    video: video.codec_name + ", " + width + "x" + height + ", " + actualFps + " fps",
    audio: audio.codec_name + ", " + (audio.sample_rate || "unknown") + " Hz, " +
      (audio.channels || "unknown") + " channels",
    duration: duration.toFixed(3) + " s",
  };
}

await mkdir(outDir, { recursive: true });
const wavCopy = resolve(outDir, "cottage-original-soundtrack.wav");
const mp3Copy = resolve(outDir, "cottage-original-soundtrack.mp3");
await copyFile(sourceWav, wavCopy);

run("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y",
  "-i", sourceWav, "-vn",
  "-codec:a", "libmp3lame", "-b:a", "192k",
  "-ar", "44100", "-ac", "2",
  mp3Copy,
]);

const wavMetadata = probe(wavCopy);
const wavAudio = wavMetadata.streams?.find((stream) => stream.codec_type === "audio");
if (!wavAudio || wavAudio.codec_name !== "pcm_s16le") {
  throw new Error("Standalone WAV must be 16-bit PCM audio.");
}
if (Number(wavAudio.sample_rate) !== 44100 || Number(wavAudio.channels) !== 2) {
  throw new Error("Standalone WAV must be 44.1 kHz stereo.");
}
assertNear(Number(wavMetadata.format?.duration), 45, 0.01, "Standalone WAV duration");

const mp3Metadata = probe(mp3Copy);
const mp3Audio = mp3Metadata.streams?.find((stream) => stream.codec_type === "audio");
if (!mp3Audio || mp3Audio.codec_name !== "mp3") {
  throw new Error("Standalone MP3 export is missing or invalid.");
}
assertNear(Number(mp3Metadata.format?.duration), 45, 0.15, "Standalone MP3 duration");

const loudness = run("ffmpeg", [
  "-hide_banner", "-i", wavCopy,
  "-af", "volumedetect",
  "-f", "null", "-",
]);
const volumeLog = loudness.stderr;
const meanMatch = volumeLog.match(/mean_volume:\\s*(-?[0-9.]+) dB/);
const peakMatch = volumeLog.match(/max_volume:\\s*(-?[0-9.]+) dB/);
const meanVolume = meanMatch ? meanMatch[1] + " dB" : "not reported";
const peakVolume = peakMatch ? peakMatch[1] + " dB" : "not reported";
if (peakMatch && Number(peakMatch[1]) > -0.1) {
  throw new Error("Standalone soundtrack peak is too close to digital clipping: " + peakVolume);
}

const videos = [
  validateVideo("cottage-intro.mp4", 1920, 1080, 120),
  validateVideo("cottage-intro-portrait.mp4", 1080, 1920, 120),
  validateVideo("cottage-intro-60fps.mp4", 1920, 1080, 60),
  validateVideo("cottage-intro-portrait-60fps.mp4", 1080, 1920, 60),
];

const report = [
  "THE COTTAGE★ — EXPORT QUALITY REPORT",
  "All technical checks passed.",
  "",
  ...videos.flatMap((item) => [
    "PASS  " + item.file,
    "      Video: " + item.video,
    "      Audio: " + item.audio,
    "      Duration: " + item.duration,
  ]),
  "",
  "PASS  cottage-original-soundtrack.wav",
  "      PCM 16-bit, 44.1 kHz, stereo, 45.000 s",
  "PASS  cottage-original-soundtrack.mp3",
  "      MP3 192 kbps, 44.1 kHz, stereo, approximately 45 s",
  "      Peak: " + peakVolume + " | Mean: " + meanVolume,
  "",
  "The report verifies file structure and technical properties, not artistic approval.",
].join("\n");

await writeFile(resolve(outDir, "technical-QA.txt"), report + "\n");
process.stdout.write(report + "\n");
