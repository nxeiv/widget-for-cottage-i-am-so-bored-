import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig,
} from "remotion";

type IntroProps = { portrait: boolean };
type Placement = [number, number, number, number];
type PhotoSpec = {
  src: string;
  label: string;
  landscape: Placement;
  portrait: Placement;
  tilt: number;
  contain?: boolean;
};
type CopyPlacement = { x: number; y: number; w: number };
type SceneData = {
  id: string;
  seconds: number;
  eyebrow: string;
  title: string;
  note: string;
  photos: PhotoSpec[];
  background: string;
  ink: string;
  accent: string;
  paper: string;
  landscapeCopy: CopyPlacement;
  portraitCopy: CopyPlacement;
  titleSize?: number;
  portraitTitleSize?: number;
  panelTilt: number;
};

const scenes: SceneData[] = [
  {
    id: "opening", seconds: 5,
    eyebrow: "A LITTLE PLACE ON THE INTERNET",
    title: "The Cottage★",
    note: "A home made out of people.",
    photos: [{
      src: "Media/cottage-seal.svg", label: "our little corner",
      landscape: [0.66, 0.13, 0.27, 0.58],
      portrait: [0.25, 0.105, 0.50, 0.245],
      tilt: 3, contain: true,
    }],
    background: "#40362D", ink: "#44372E", accent: "#C28E61", paper: "#F7ECDD",
    landscapeCopy: { x: 0.055, y: 0.28, w: 0.58 },
    portraitCopy: { x: 0.075, y: 0.405, w: 0.85 },
    titleSize: 142, portraitTitleSize: 98, panelTilt: -1.2,
  },
  {
    id: "familiar", seconds: 6,
    eyebrow: "IT STARTED WITH A HELLO",
    title: "Strangers became\nfamiliar.",
    note: "Different places. Different days. Somehow, the same little corner.",
    photos: [
      {
        src: "Media/Roblox Moment 1.jpg", label: "the first hellos",
        landscape: [0.035, 0.33, 0.47, 0.57], portrait: [0.035, 0.105, 0.70, 0.265],
        tilt: -3.6,
      },
      {
        src: "Media/Roblox Moment 2.jpg", label: "finding our people",
        landscape: [0.585, 0.19, 0.36, 0.64], portrait: [0.30, 0.605, 0.65, 0.275],
        tilt: 3.1,
      },
    ],
    background: "#E9D8C4", ink: "#493A31", accent: "#75866A", paper: "#FFF7EA",
    landscapeCopy: { x: 0.075, y: 0.055, w: 0.63 },
    portraitCopy: { x: 0.075, y: 0.395, w: 0.85 },
    titleSize: 91, portraitTitleSize: 76, panelTilt: -1.8,
  },
  {
    id: "laugh", seconds: 6,
    eyebrow: "THE MOMENTS WE KEEP",
    title: "A lot of\nlaughing.",
    note: "The kind of moments that don't need explaining to anyone else.",
    photos: [
      {
        src: "Media/Among us Moment 2.jpg", label: "a very serious game night",
        landscape: [0.045, 0.29, 0.40, 0.62], portrait: [0.045, 0.105, 0.68, 0.285],
        tilt: -2.8,
      },
      {
        src: "Media/Gartic Phone Art 1.jpg", label: "art. technically.",
        landscape: [0.56, 0.20, 0.39, 0.64], portrait: [0.28, 0.58, 0.66, 0.285],
        tilt: 3.8,
      },
    ],
    background: "#E8CFC2", ink: "#4B3931", accent: "#B87969", paper: "#FFF4E8",
    landscapeCopy: { x: 0.37, y: 0.055, w: 0.55 },
    portraitCopy: { x: 0.075, y: 0.395, w: 0.85 },
    titleSize: 100, portraitTitleSize: 82, panelTilt: 1.4,
  },
  {
    id: "together", seconds: 7,
    eyebrow: "NOT EVERYTHING HAS TO BE AN EVENT",
    title: "Just being there\nis enough.",
    note: "A shared screen. A quiet call. A little company at the end of a long day.",
    photos: [{
      src: "Media/Moment 1.png", label: "nothing special. everything special.",
      landscape: [0.44, 0.095, 0.50, 0.78],
      portrait: [0.10, 0.105, 0.80, 0.39],
      tilt: 2.2,
    }],
    background: "#6D7560", ink: "#493B32", accent: "#D3AA73", paper: "#F8EBDD",
    landscapeCopy: { x: 0.055, y: 0.19, w: 0.41 },
    portraitCopy: { x: 0.075, y: 0.565, w: 0.85 },
    titleSize: 83, portraitTitleSize: 76, panelTilt: -1.2,
  },
  {
    id: "backyard", seconds: 8,
    eyebrow: "AND WHEN WE FEEL LIKE PLAYING",
    title: "There's a backyard,\ntoo.",
    note: "A world to build, wander, get lost in, and make ours.",
    photos: [
      {
        src: "Media/far zoom shot of 2 players sitting near a cherry tree s6.png",
        label: "a quiet place to sit",
        landscape: [0.035, 0.285, 0.50, 0.63], portrait: [0.045, 0.205, 0.74, 0.315],
        tilt: -2.7,
      },
      {
        src: "Media/wide shot of background with 2 players fishing in a brige s6.png",
        label: "taking the long way home",
        landscape: [0.575, 0.145, 0.37, 0.58], portrait: [0.255, 0.565, 0.69, 0.30],
        tilt: 2.6,
      },
    ],
    background: "#77816A", ink: "#493A30", accent: "#E0B77B", paper: "#F8EBDD",
    landscapeCopy: { x: 0.09, y: 0.035, w: 0.62 },
    portraitCopy: { x: 0.075, y: 0.025, w: 0.85 },
    titleSize: 88, portraitTitleSize: 71, panelTilt: -1.1,
  },
  {
    id: "memory", seconds: 7,
    eyebrow: "THE GAME IS ONLY ONE PART",
    title: "It's who was\nthere.",
    note: "The little stories stay with us long after we log off.",
    photos: [
      {
        src: "Media/SMP 7.png", label: "the places we made",
        landscape: [0.035, 0.30, 0.42, 0.59], portrait: [0.045, 0.20, 0.66, 0.29],
        tilt: -3.2,
      },
      {
        src: "Media/SMP 8.png", label: "the nights that became memories",
        landscape: [0.52, 0.12, 0.42, 0.58], portrait: [0.30, 0.515, 0.65, 0.29],
        tilt: 2.9,
      },
      {
        src: "Media/SMP tiny map.png", label: "our little corner of the world",
        landscape: [0.69, 0.68, 0.23, 0.22], portrait: [0.035, 0.765, 0.36, 0.145],
        tilt: -4.1,
      },
    ],
    background: "#E9D9C8", ink: "#493A31", accent: "#B97868", paper: "#FFF7EA",
    landscapeCopy: { x: 0.20, y: 0.035, w: 0.60 },
    portraitCopy: { x: 0.075, y: 0.025, w: 0.85 },
    titleSize: 91, portraitTitleSize: 77, panelTilt: 1.0,
  },
  {
    id: "end", seconds: 7.8,
    eyebrow: "THE COTTAGE★",
    title: "The home is\nthe people.",
    note: "The Cottage★ is the home. The SMP is the backyard.",
    photos: [{
      src: "Media/server pfp.jpg", label: "made of people, held together by memories",
      landscape: [0.65, 0.14, 0.28, 0.58],
      portrait: [0.25, 0.12, 0.50, 0.245],
      tilt: 2.4, contain: true,
    }],
    background: "#43382E", ink: "#46382F", accent: "#C99465", paper: "#F8EBDD",
    landscapeCopy: { x: 0.06, y: 0.25, w: 0.55 },
    portraitCopy: { x: 0.075, y: 0.46, w: 0.85 },
    titleSize: 112, portraitTitleSize: 87, panelTilt: -1.5,
  },
];

const Grain: React.FC<{ id: string; seed: number; opacity?: number }> = ({
  id, seed, opacity = 0.12,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "soft-light" }}>
    <svg width="100%" height="100%" preserveAspectRatio="none">
      <filter id={"grain-" + id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="2"
          seed={seed} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={"url(#grain-" + id + ")"} opacity="0.34" />
    </svg>
  </AbsoluteFill>
);

const PhotoCard: React.FC<{
  photo: PhotoSpec;
  index: number;
  portrait: boolean;
  frame: number;
}> = ({ photo, index, portrait, frame }) => {
  const { fps, width, height } = useVideoConfig();
  const [x, y, w, h] = portrait ? photo.portrait : photo.landscape;
  const enter = spring({
    frame,
    fps,
    delay: index * 9,
    config: { damping: 15, stiffness: 105, mass: 0.82 },
  });
  const floatPhase = frame / fps * 1.45 + index * 1.7;
  const floatX = Math.sin(floatPhase) * (portrait ? 5 : 10);
  const floatY = Math.cos(floatPhase * 0.82) * (portrait ? 7 : 12);
  const slideX = (1 - enter) * (index % 2 === 0 ? -190 : 190);
  const slideY = (1 - enter) * (index % 2 === 0 ? 75 : -55);
  const rotate = photo.tilt + (1 - enter) * (index % 2 === 0 ? -11 : 12);

  return (
    <div style={{
      position: "absolute", left: x * width, top: y * height,
      width: w * width, height: h * height,
      padding: portrait ? 10 : 14,
      paddingBottom: portrait ? 42 : 49,
      boxSizing: "border-box",
      background: "#FFF9F0",
      border: "1px solid rgba(105,77,56,.16)",
      borderRadius: 4,
      boxShadow: "0 28px 72px rgba(35,25,18,.28), 0 5px 14px rgba(35,25,18,.14)",
      opacity: enter,
      transform: "translate3d(" + (slideX + floatX) + "px," + (slideY + floatY) +
        "px,0) rotate(" + rotate + "deg) scale(" + (0.83 + enter * 0.17) + ")",
      transformOrigin: "center center",
      zIndex: 3 + index,
    }}>
      <div style={{
        width: "100%", height: "100%", overflow: "hidden",
        background: "#E8DCCB", border: "1px solid rgba(79,58,42,.12)",
      }}>
        <Img src={staticFile(photo.src)} style={{
          width: "100%", height: "100%", display: "block",
          objectFit: photo.contain ? "contain" : "cover",
          padding: photo.contain ? "8%" : 0,
          boxSizing: "border-box",
          background: photo.contain ? "#EADBC8" : "#D8C8B5",
          filter: "saturate(1.07) contrast(1.015)",
        }} />
      </div>
      <div style={{
        position: "absolute", left: portrait ? 14 : 19, right: portrait ? 12 : 17,
        bottom: portrait ? 9 : 12, height: portrait ? 24 : 28,
        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        color: "#655044", fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: portrait ? 15 : 18, fontStyle: "italic",
        lineHeight: portrait ? "24px" : "28px",
      }}>{photo.label}</div>
      <div style={{
        position: "absolute", left: "36%", top: -10,
        width: portrait ? 88 : 118, height: portrait ? 19 : 23,
        background: "rgba(214,177,119,.68)",
        transform: "rotate(-4deg)",
        boxShadow: "0 2px 4px rgba(65,46,30,.08)",
      }} />
    </div>
  );
};

const Scribbles: React.FC<{ accent: string; frame: number; portrait: boolean }> = ({
  accent, frame, portrait,
}) => {
  const dash = interpolate(frame, [0, 70], [160, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const width = portrait ? 230 : 360;
  return (
    <>
      <svg viewBox="0 0 420 180" style={{
        position: "absolute", right: portrait ? 20 : 70,
        top: portrait ? "36%" : "5%", width, height: "auto",
        overflow: "visible", opacity: 0.82, zIndex: 7,
        transform: "rotate(" + (Math.sin(frame / 35) * 2) + "deg)",
      }}>
        <path d="M8 112 C60 20 92 154 154 84 S252 27 292 100 S355 139 410 44"
          fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round"
          strokeDasharray="160 260" strokeDashoffset={dash} />
        <path d="M318 18 q26 -30 40 2 q-16 28 -40 -2 M356 133 q19 -20 35 1 q-14 22 -35 -1"
          fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div style={{
        position: "absolute", left: portrait ? 25 : 60,
        bottom: portrait ? 100 : 72, zIndex: 7,
        width: portrait ? 44 : 62, height: portrait ? 44 : 62,
        border: "2px solid " + accent, borderRadius: "50%",
        opacity: 0.56, transform: "rotate(" + (frame / 7) + "deg)",
      }}>
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          width: "135%", height: 2, background: accent,
          transform: "translate(-50%,-50%) rotate(45deg)",
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          width: "135%", height: 2, background: accent,
          transform: "translate(-50%,-50%) rotate(-45deg)",
        }} />
      </div>
    </>
  );
};

const CopyPanel: React.FC<{
  data: SceneData;
  portrait: boolean;
  frame: number;
}> = ({ data, portrait, frame }) => {
  const { fps, width, height } = useVideoConfig();
  const placement = portrait ? data.portraitCopy : data.landscapeCopy;
  const reveal = spring({
    frame, fps, delay: 4,
    config: { damping: 17, stiffness: 92, mass: 0.95 },
  });
  const titleSize = portrait
    ? (data.portraitTitleSize || 78)
    : (data.titleSize || 92);
  return (
    <div style={{
      position: "absolute", left: placement.x * width, top: placement.y * height,
      width: placement.w * width, boxSizing: "border-box",
      padding: portrait ? "24px 25px 25px" : "28px 34px 30px",
      background: data.paper,
      border: "1px solid rgba(108,78,55,.24)",
      boxShadow: "0 22px 58px rgba(31,23,17,.18), 0 3px 9px rgba(31,23,17,.08)",
      borderRadius: 5,
      opacity: reveal,
      transform: "translateY(" + ((1 - reveal) * 52) + "px) rotate(" +
        (data.panelTilt + (1 - reveal) * 4) + "deg) scale(" + (0.94 + reveal * 0.06) + ")",
      zIndex: 12,
    }}>
      <div style={{
        fontFamily: "Arial, sans-serif", fontWeight: 800,
        fontSize: portrait ? 14 : 16, letterSpacing: ".19em",
        color: data.accent, marginBottom: portrait ? 15 : 18,
      }}>{data.eyebrow}</div>
      <div style={{
        color: data.ink, fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: titleSize, fontWeight: 700, lineHeight: 0.94,
        letterSpacing: "-.055em", whiteSpace: "pre-line",
      }}>{data.title}</div>
      <div style={{
        width: portrait ? 108 : 142, height: 4, marginTop: portrait ? 17 : 21,
        borderRadius: 10, background: data.accent,
        transform: "rotate(-1.4deg)",
      }} />
      <div style={{
        marginTop: portrait ? 15 : 19,
        fontFamily: "Arial, sans-serif", fontSize: portrait ? 19 : 22,
        lineHeight: 1.42, color: "#6E5B4E", maxWidth: "96%",
      }}>{data.note}</div>
    </div>
  );
};

const ScrapbookChrome: React.FC<{
  data: SceneData;
  frame: number;
  portrait: boolean;
}> = ({ data, frame, portrait }) => {
  const { width, height } = useVideoConfig();
  const shift = Math.sin(frame / 46) * 5;
  return (
    <>
      <AbsoluteFill style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 15% 10%, rgba(255,246,224,.22), transparent 40%)," +
          "radial-gradient(ellipse at 88% 92%, rgba(192,132,91,.19), transparent 42%)," +
          "linear-gradient(135deg, " + data.background + ", " + data.background + ")",
      }} />
      <div style={{
        position: "absolute", inset: portrait ? 23 : 30,
        border: "1px solid " + data.accent + "88",
        borderRadius: 7, pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", inset: portrait ? 32 : 41,
        border: "1px dashed " + data.accent + "55",
        borderRadius: 5, pointerEvents: "none", zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: portrait ? 49 : 54,
        right: portrait ? 50 : 70,
        fontFamily: "Arial, sans-serif", fontWeight: 800,
        fontSize: portrait ? 11 : 13, letterSpacing: ".22em",
        color: data.accent, opacity: 0.8, zIndex: 2,
        transform: "rotate(" + (shift * 0.15) + "deg)",
      }}>A COLLECTION OF LITTLE MOMENTS</div>
      <div style={{
        position: "absolute", bottom: portrait ? 47 : 40,
        right: portrait ? 48 : 70,
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: portrait ? 13 : 16, color: data.accent,
        opacity: 0.83, zIndex: 8,
      }}>the cottage scrapbook  ·  kept close</div>
      <div style={{
        position: "absolute", left: portrait ? 49 : 72,
        top: portrait ? 55 : 55,
        color: data.accent, opacity: 0.88, zIndex: 2,
        fontFamily: "Georgia, serif", fontSize: portrait ? 19 : 24,
        transform: "rotate(-9deg)",
      }}>✳</div>
      <div style={{
        position: "absolute", right: portrait ? 58 : 90,
        bottom: portrait ? 95 : 82,
        color: data.accent, opacity: 0.75, zIndex: 8,
        fontFamily: "Georgia, serif", fontSize: portrait ? 32 : 45,
        transform: "rotate(" + (shift + 12) + "deg)",
      }}>✧</div>
      <div style={{
        position: "absolute", top: height * 0.5, left: portrait ? 18 : 26,
        width: 4, height: portrait ? 150 : 190, borderRadius: 4,
        background: data.accent, opacity: 0.22, zIndex: 1,
      }} />
      <div style={{
        position: "absolute", bottom: portrait ? 47 : 40,
        left: portrait ? 49 : 72, zIndex: 8,
        color: data.accent, fontFamily: "Arial, sans-serif",
        fontWeight: 800, fontSize: portrait ? 11 : 13,
        letterSpacing: ".2em",
      }}>THE COTTAGE★  /  VOL. 01</div>
    </>
  );
};

const Scene: React.FC<{ data: SceneData; portrait: boolean }> = ({ data, portrait }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const transitionFrames = Math.round(fps * 0.3);
  const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const sceneLength = data.seconds * fps;
  const fadeOut = interpolate(
    frame, [sceneLength - transitionFrames, sceneLength], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const camera = interpolate(frame, [0, sceneLength], [1.035, 1.095]);
  const cameraX = interpolate(frame, [0, sceneLength], [0, portrait ? -8 : -20]);
  const cameraY = interpolate(frame, [0, sceneLength], [0, portrait ? 9 : -10]);

  return (
    <AbsoluteFill style={{
      backgroundColor: data.background, opacity: Math.min(fadeIn, fadeOut),
      overflow: "hidden",
    }}>
      <AbsoluteFill style={{
        transform: "translate(" + cameraX + "px," + cameraY + "px) scale(" + camera + ")",
      }}>
        <ScrapbookChrome data={data} frame={frame} portrait={portrait} />
        {data.photos.map((photo, index) => (
          <PhotoCard key={photo.src} photo={photo} index={index}
            portrait={portrait} frame={frame} />
        ))}
        <Scribbles accent={data.accent} frame={frame} portrait={portrait} />
        <CopyPanel data={data} portrait={portrait} frame={frame} />
      </AbsoluteFill>
      <Grain id={data.id} seed={Math.floor(frame / 3)} opacity={0.13} />
    </AbsoluteFill>
  );
};

export const CottageIntro: React.FC<IntroProps> = ({ portrait }) => {
  const { fps } = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#40362D" }}>
      <Audio
        src={staticFile("motion/production/remotion/public/audio/cottage-original-bed.wav")}
        volume={0.68}
      />
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
