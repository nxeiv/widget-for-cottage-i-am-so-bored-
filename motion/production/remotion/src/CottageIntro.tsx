import React from "react";
import {
  AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

type IntroProps = { portrait: boolean };
type SceneData = {
  id: string;
  seconds: number;
  eyebrow: string;
  title: string;
  note: string;
  photo: string;
  secondPhoto?: string;
  thirdPhoto?: string;
  background: string;
  ink: string;
  accent: string;
  mood: "paper" | "night";
  tilt: number;
};

const scenes: SceneData[] = [
  {
    id: "opening", seconds: 5, eyebrow: "A LITTLE PLACE ON THE INTERNET",
    title: "The Cottage★", note: "A home made out of people.",
    photo: "Media/cottage-seal.svg", background: "#2D2923", ink: "#FFFBF3",
    accent: "#C9A968", mood: "night", tilt: -1.2,
  },
  {
    id: "familiar", seconds: 6, eyebrow: "IT STARTED WITH A HELLO",
    title: "Strangers became familiar.", note: "Different places. Different days. Somehow, the same little corner.",
    photo: "Media/Roblox Moment 1.jpg", secondPhoto: "Media/Roblox Moment 2.jpg",
    background: "#FFFBF3", ink: "#2D2923", accent: "#7F936F", mood: "paper", tilt: -2.4,
  },
  {
    id: "laugh", seconds: 6, eyebrow: "THE MOMENTS WE KEEP",
    title: "A lot of laughing.", note: "The kind of moments that don't need explaining to anyone else.",
    photo: "Media/Among us Moment 2.jpg", secondPhoto: "Media/Gartic Phone Art 1.jpg",
    background: "#EFE7D7", ink: "#2D2923", accent: "#C78F82", mood: "paper", tilt: 1.8,
  },
  {
    id: "together", seconds: 7, eyebrow: "NOT EVERYTHING HAS TO BE AN EVENT",
    title: "Sometimes, just being there is enough.", note: "A shared screen. A silly drawing. A voice call that runs late.",
    photo: "Media/Moment 1.png", secondPhoto: "Media/Gartic Phone Art 1.jpg",
    background: "#2D2923", ink: "#FFFBF3", accent: "#C9A968", mood: "night", tilt: -1.6,
  },
  {
    id: "backyard", seconds: 8, eyebrow: "AND WHEN WE FEEL LIKE PLAYING",
    title: "There's a backyard, too.", note: "A world to build, wander, get lost in, and make ours.",
    photo: "Media/far zoom shot of 2 players sitting near a cherry tree s6.png",
    secondPhoto: "Media/wide shot of background with 2 players fishing in a brige s6.png",
    thirdPhoto: "Media/SMP 7.png",
    background: "#55644A", ink: "#FFFBF3", accent: "#C9A968", mood: "night", tilt: 1.1,
  },
  {
    id: "memory", seconds: 7, eyebrow: "THE GAME IS ONLY ONE PART",
    title: "It's who was there.", note: "The little stories stay with us long after we log off.",
    photo: "Media/SMP 8.png", secondPhoto: "Media/Roblox Moment 2.jpg",
    background: "#FFFBF3", ink: "#2D2923", accent: "#C78F82", mood: "paper", tilt: -1.4,
  },
  {
    id: "end", seconds: 7.8, eyebrow: "THE COTTAGE★",
    title: "The home is the people.", note: "The Cottage is the home. The SMP is the backyard.",
    photo: "Media/server pfp modified.png", secondPhoto: "Media/cottage-seal.svg",
    background: "#2D2923", ink: "#FFFBF3", accent: "#C9A968", mood: "night", tilt: 0.8,
  },
];

const Grain: React.FC<{ opacity?: number; seed: number; id: string }> = ({ opacity = 0.16, seed, id }) => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "soft-light" }}>
    <svg width="100%" height="100%" preserveAspectRatio="none">
      <filter id={`paper-grain-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" seed={seed} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#paper-grain-${id})`} opacity="0.42" />
    </svg>
  </AbsoluteFill>
);

const Doodle: React.FC<{ accent: string; portrait: boolean }> = ({ accent, portrait }) => (
  <svg
    viewBox="0 0 420 150"
    style={{
      position: "absolute",
      width: portrait ? 280 : 360,
      height: "auto",
      right: portrait ? 22 : 70,
      bottom: portrait ? 170 : 72,
      opacity: 0.78,
      overflow: "visible",
    }}
  >
    <path d="M8 82 C42 22 84 122 126 70 S204 26 232 79 S306 127 340 54 S388 35 410 76"
      fill="none" stroke={accent} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="2 8" />
    <path d="M350 18 q18 -16 28 4 q-12 19 -28 -4 M382 106 q15 -15 25 1 q-9 17 -25 -1"
      fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PhotoCard: React.FC<{
  src: string; x: number; y: number; width: number; height: number;
  rotate: number; frame: number; index: number; portrait: boolean;
}> = ({ src, x, y, width, height, rotate, frame, index, portrait }) => {
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, fps * 7], [0, index % 2 === 0 ? -10 : 10], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, fps * 0.8], [0.94, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div style={{
      position: "absolute", left: x, top: y, width, height,
      padding: portrait ? 9 : 11,
      background: "#FFFBF3",
      boxShadow: "0 24px 70px rgba(22,18,13,.25), 0 3px 9px rgba(22,18,13,.12)",
      transform: `translateY(${drift}px) rotate(${rotate}deg) scale(${scale})`,
      transformOrigin: "center center",
      boxSizing: "border-box",
    }}>
      <Img src={staticFile(src)} style={{
        display: "block", width: "100%", height: "100%",
        objectFit: src.endsWith(".svg") ? "contain" : "cover",
        background: src.endsWith(".svg") ? "#EFE7D7" : "#D8CCB8",
        filter: "saturate(.91) contrast(.98)",
      }} />
      <div style={{
        position: "absolute", left: portrait ? 15 : 18, top: -5,
        width: portrait ? 78 : 96, height: portrait ? 17 : 20,
        background: "rgba(201,169,104,.42)", transform: "rotate(-5deg)",
      }} />
    </div>
  );
};

const Scene: React.FC<{ data: SceneData; portrait: boolean }> = ({ data, portrait }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const transitionFrames = Math.round(fps * 0.3);
  const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [data.seconds * fps - transitionFrames, data.seconds * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const isPortrait = portrait;
  const titleSize = isPortrait ? (data.title.length > 27 ? 52 : 68) : (data.title.length > 25 ? 68 : 88);
  const textWidth = isPortrait ? width - 112 : width * 0.43;
  const primary = isPortrait
    ? { x: 90, y: height * 0.40, width: width - 180, height: height * 0.31 }
    : { x: width * 0.53, y: height * 0.17, width: width * 0.37, height: height * 0.64 };
  const secondary = isPortrait
    ? { x: width * 0.47, y: height * 0.61, width: width * 0.43, height: height * 0.18 }
    : { x: width * 0.67, y: height * 0.57, width: width * 0.22, height: height * 0.25 };
  const tertiary = isPortrait
    ? { x: width * 0.08, y: height * 0.70, width: width * 0.40, height: height * 0.16 }
    : { x: width * 0.49, y: height * 0.67, width: width * 0.19, height: height * 0.22 };
  const slowPush = interpolate(frame, [0, data.seconds * fps], [1, 1.025]);
  const textOffset = interpolate(frame, [0, fps * 0.55], [16, 0], { extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [0, fps * 0.45], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: data.background, opacity, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${slowPush})` }}>
        <div style={{
          position: "absolute", inset: isPortrait ? 34 : 42,
          border: `1px solid ${data.accent}55`,
          borderRadius: isPortrait ? 24 : 18,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", left: isPortrait ? 58 : 92, top: isPortrait ? 105 : 105,
          width: textWidth, color: data.ink,
          opacity: textOpacity, transform: `translateY(${textOffset}px)`,
        }}>
          <div style={{
            fontFamily: "Inter, Arial, sans-serif", fontSize: isPortrait ? 17 : 18,
            fontWeight: 750, letterSpacing: "0.22em", color: data.accent,
            marginBottom: isPortrait ? 28 : 34,
          }}>{data.eyebrow}</div>
          <div style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: titleSize, fontWeight: 700, lineHeight: 0.99,
            letterSpacing: "-0.055em", maxWidth: textWidth,
          }}>{data.title}</div>
          <div style={{
            marginTop: isPortrait ? 28 : 34, maxWidth: textWidth * 0.92,
            fontFamily: "Inter, Arial, sans-serif", fontSize: isPortrait ? 25 : 24,
            lineHeight: 1.5, color: data.ink, opacity: 0.76,
          }}>{data.note}</div>
        </div>
        <PhotoCard src={data.photo} {...primary} rotate={data.tilt} frame={frame} index={0} portrait={isPortrait} />
        {data.secondPhoto && <PhotoCard src={data.secondPhoto} {...secondary} rotate={data.tilt * -0.72} frame={frame} index={1} portrait={isPortrait} />}
        {data.thirdPhoto && <PhotoCard src={data.thirdPhoto} {...tertiary} rotate={data.tilt * 0.8} frame={frame} index={2} portrait={isPortrait} />}
        <Doodle accent={data.accent} portrait={isPortrait} />
        <div style={{
          position: "absolute", left: isPortrait ? 60 : 92, bottom: isPortrait ? 92 : 72,
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: isPortrait ? 19 : 20, color: data.ink, opacity: 0.48,
          letterSpacing: ".02em",
        }}>kept close, always.</div>
      </AbsoluteFill>
      <Grain id={data.id} seed={frame} opacity={data.mood === "night" ? 0.19 : 0.15} />
    </AbsoluteFill>
  );
};

export const CottageIntro: React.FC<IntroProps> = ({ portrait }) => {
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#2D2923" }}>
      {scenes.map((data) => {
        const start = from;
        from += data.seconds * fps - Math.round(fps * 0.3);
        return (
          <Sequence key={data.id} from={start} durationInFrames={data.seconds * fps} name={data.id}>
            <Scene data={data} portrait={portrait} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
