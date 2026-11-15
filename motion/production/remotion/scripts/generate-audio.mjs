import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const SAMPLE_RATE = 44100;
const DURATION = 45;
const FRAME_COUNT = SAMPLE_RATE * DURATION;
const left = new Float32Array(FRAME_COUNT);
const right = new Float32Array(FRAME_COUNT);

const midiHz = (note) => 440 * Math.pow(2, (note - 69) / 12);

function addVoice(start, duration, note, amplitude, pan = 0, style = "pluck", seed = 0) {
  const first = Math.max(0, Math.floor(start * SAMPLE_RATE));
  const last = Math.min(FRAME_COUNT, Math.floor((start + duration) * SAMPLE_RATE));
  const frequency = midiHz(note);
  const attack = style === "pad" ? 1.25 : 0.018;
  const release = style === "pad" ? 2.3 : 0.62;
  const leftGain = Math.sqrt((1 - pan) * 0.5);
  const rightGain = Math.sqrt((1 + pan) * 0.5);
  const phaseOffset = seed * 0.013;
  const vibratoDepth = style === "pad" ? 0.0018 : 0.0007;

  for (let i = first; i < last; i++) {
    const t = (i - first) / SAMPLE_RATE;
    const attackEnv = Math.min(1, t / attack);
    const releaseEnv = Math.min(1, Math.max(0, (duration - t) / release));
    const decay = style === "pad" ? 0.94 + 0.06 * Math.sin(t * 1.2) : Math.exp(-3.9 * t / duration);
    const envelope = attackEnv * releaseEnv * decay;
    const vibrato = Math.sin((t * 0.72 + phaseOffset) * Math.PI * 2) * vibratoDepth;
    const phase = (frequency * (1 + vibrato) * t + phaseOffset) * Math.PI * 2;

    let wave;
    if (style === "pad") {
      wave = Math.sin(phase) * 0.78
        + Math.sin(phase * 2.003) * 0.13
        + Math.sin(phase * 3.01) * 0.035;
    } else {
      wave = Math.sin(phase) * 0.78
        + Math.sin(phase * 2.01) * 0.17
        + Math.sin(phase * 3.03) * 0.055;
      wave *= 0.96 + 0.04 * Math.sin(t * 19 + seed);
    }

    const sample = wave * amplitude * envelope;
    left[i] += sample * leftGain;
    right[i] += sample * rightGain;
  }
}

function addSoftTick(time, seed) {
  const start = Math.max(0, Math.floor(time * SAMPLE_RATE));
  const count = Math.floor(0.22 * SAMPLE_RATE);
  let noiseState = (seed + 1) * 7919;
  for (let offset = 0; offset < count && start + offset < FRAME_COUNT; offset++) {
    noiseState = (noiseState * 16807) % 2147483647;
    const random = noiseState / 2147483647 * 2 - 1;
    const t = offset / SAMPLE_RATE;
    const envelope = Math.exp(-t * 19) * Math.min(1, t * 120);
    const softClick = random * 0.012 * envelope
      + Math.sin(2 * Math.PI * (740 - t * 900) * t) * 0.018 * envelope;
    left[start + offset] += softClick * 0.72;
    right[start + offset] += softClick * 0.84;
  }
}

const chords = [
  { at: 0, duration: 8.2, notes: [48, 55, 59, 64], bass: 36 },
  { at: 7.5, duration: 8.1, notes: [43, 50, 55, 59], bass: 31 },
  { at: 15, duration: 8.0, notes: [45, 52, 55, 60], bass: 33 },
  { at: 22.5, duration: 8.0, notes: [41, 48, 53, 57], bass: 29 },
  { at: 30, duration: 8.0, notes: [48, 55, 59, 64], bass: 36 },
  { at: 37.5, duration: 5.4, notes: [43, 50, 55, 59], bass: 31 },
  { at: 42.5, duration: 2.5, notes: [48, 55, 60, 64, 67], bass: 36 },
];

// Slow, warm chord pads create the feeling of a room settling into an evening.
chords.forEach((chord, chordIndex) => {
  chord.notes.forEach((note, noteIndex) => {
    const amp = noteIndex === 0 ? 0.064 : 0.046;
    addVoice(chord.at, chord.duration, note, amp,
      (noteIndex - 1.5) * 0.17, "pad", chordIndex * 7 + noteIndex);
    if (noteIndex === 0) {
      addVoice(chord.at, chord.duration, chord.bass, 0.052, -0.12, "pad", chordIndex + 3);
    }
  });
});

// A small, original five-note motif—unhurried, with space between phrases.
const motif = [64, 67, 71, 74, 72, 67, 64, 62, 67, 71, 76, 74, 71, 67, 69, 72];
let noteIndex = 0;
for (let time = 3.7; time < 43.2; time += 0.72) {
  const phrasePosition = noteIndex % motif.length;
  const note = motif[phrasePosition];
  const phraseLift = phrasePosition >= 8 ? 1.04 : 1;
  const pan = Math.sin(noteIndex * 0.83) * 0.38;
  addVoice(time, 1.18, note, 0.075 * phraseLift, pan, "pluck", noteIndex);
  if (noteIndex % 4 === 2) {
    addVoice(time + 0.08, 1.02, note - 12, 0.026, -pan * 0.5, "pluck", noteIndex + 1);
  }
  noteIndex++;
}

// A few soft harmonic glints at the scene turns; no trailer impacts or sampled sounds.
[4.58, 10.16, 15.74, 22.32, 29.9, 36.48].forEach((time, index) => {
  addVoice(time, 1.05, [76, 79, 74, 72, 76, 79][index], 0.032,
    index % 2 === 0 ? -0.25 : 0.25, "pluck", index + 20);
  addSoftTick(time, index + 4);
});

// A very low, gentle tonal floor gives the mix a little warmth on small speakers.
addVoice(0, DURATION, 41, 0.015, 0, "pad", 91);

// A soft fade at each end and a conservative peak keep the mix comfortable.
let peak = 0;
for (let i = 0; i < FRAME_COUNT; i++) {
  const t = i / SAMPLE_RATE;
  const fadeIn = Math.min(1, t / 1.25);
  const fadeOut = Math.min(1, (DURATION - t) / 2.4);
  const fade = Math.min(fadeIn, fadeOut);
  left[i] *= fade;
  right[i] *= fade;
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const gain = 0.72 / Math.max(peak, 0.0001);

const dataBytes = FRAME_COUNT * 4;
const wav = Buffer.alloc(44 + dataBytes);
wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataBytes, 4);
wav.write("WAVE", 8);
wav.write("fmt ", 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SAMPLE_RATE, 24);
wav.writeUInt32LE(SAMPLE_RATE * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataBytes, 40);

for (let i = 0; i < FRAME_COUNT; i++) {
  const l = Math.max(-0.98, Math.min(0.98, left[i] * gain));
  const r = Math.max(-0.98, Math.min(0.98, right[i] * gain));
  wav.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(r * 32767), 46 + i * 4);
}

const output = "public/audio/cottage-original-bed.wav";
await mkdir(dirname(output), { recursive: true });
await writeFile(output, wav);
process.stdout.write("Generated original 45-second stereo soundtrack: " + output + "\n");
