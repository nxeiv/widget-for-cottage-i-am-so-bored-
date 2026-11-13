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


const SceneOrnaments: React.FC<{
  data: SceneData;
  frame: number;
  portrait: boolean;
  index: number;
}> = ({ data, frame, portrait, index }) => {
  const { width, height, fps } = useVideoConfig();
  const pulse = 0.5 + Math.sin(frame / Math.max(1, fps) * 1.35) * 0.5;
  const draw = interpolate(frame, [0, fps * 1.1], [210, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const id = "ornament-" + data.id;
  const edge = portrait ? 31 : 48;
  const vineX = width - (portrait ? 112 : 150);
  const vineY = portrait ? height * 0.34 : height * 0.18;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 2 }}>
      <svg
        viewBox={"0 0 " + width + " " + height}
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <pattern id={id + "-speckle"} width={portrait ? 37 : 43} height={portrait ? 37 : 43} patternUnits="userSpaceOnUse">
            <circle cx="4" cy="8" r="1.15" fill={data.ink} opacity=".16" />
            <circle cx="27" cy="23" r=".8" fill={data.ink} opacity=".11" />
            <circle cx="15" cy="34" r=".65" fill={data.accent} opacity=".18" />
          </pattern>
          <linearGradient id={id + "-wash"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF8E9" stopOpacity=".36" />
            <stop offset=".52" stopColor="#FFF8E9" stopOpacity="0" />
            <stop offset="1" stopColor="#B97868" stopOpacity=".13" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill={"url(#" + id + "-speckle)"} opacity=".42" />
        <rect width={width} height={height} fill={"url(#" + id + "-wash)"} />
        <g fill="none" stroke={data.accent} strokeLinecap="round" strokeLinejoin="round">
          <path
            d={"M " + edge + " " + (edge + 92) + " C " + edge + " " + (edge + 38) + ", " + (edge + 24) + " " + edge + ", " + (edge + 92) + " " + edge}
            strokeWidth="2.2" opacity=".6"
          />
          <path
            d={"M " + (width - edge) + " " + (height - edge - 88) + " C " + (width - edge) + " " + (height - edge - 34) + ", " + (width - edge - 25) + " " + (height - edge) + ", " + (width - edge - 92) + " " + (height - edge)}
            strokeWidth="2.2" opacity=".55"
          />
          <path
            d={"M " + (edge + 11) + " " + (edge + 112) + " l 0 46 m -7 -7 l 7 7 l 7 -7"}
            strokeWidth="1.5" opacity=".25"
          />
          <path
            d={"M " + (width - edge - 12) + " " + (height - edge - 124) + " l 0 46 m -7 -7 l 7 7 l 7 -7"}
            strokeWidth="1.5" opacity=".22"
          />
        </g>

        <g
          transform={"translate(" + vineX + " " + vineY + ") rotate(" + (Math.sin(frame / 42) * 2.2) + ")"}
          fill="none"
          stroke={data.accent}
          strokeWidth={portrait ? 2.2 : 2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".52"
        >
          <path d="M0 150 C-20 100 18 72 -4 18 C-15 -6 -31 -17 -48 -22" strokeDasharray="210 210" strokeDashoffset={draw} />
          <path d="M-7 103 C-42 91 -57 65 -51 43 C-27 46 -10 64 -7 103Z" />
          <path d="M2 74 C34 61 46 38 38 18 C15 22 3 43 2 74Z" />
          <path d="M-9 37 C-34 26 -41 6 -31 -11 C-13 -3 -5 16 -9 37Z" />
          <path d="M-3 123 C24 113 37 94 28 77 C10 81 0 98 -3 123Z" />
          <path d="M-43 -20 C-53 -36 -49 -49 -37 -56 C-24 -46 -28 -30 -43 -20Z" />
        </g>

        <g
          transform={"translate(" + (width * (portrait ? 0.16 : 0.83)) + " " + (height * (portrait ? 0.49 : 0.76)) + ") rotate(" + (-8 + pulse * 4) + ")"}
          fill="none"
          stroke={data.accent}
          strokeWidth="2.3"
          strokeLinecap="round"
          opacity=".5"
        >
          <path d="M0 -24 C5 -7 9 -5 25 0 C9 5 5 9 0 25 C-5 9 -9 5 -25 0 C-9 -5 -5 -9 0 -24Z" />
          <path d="M0 -11 L0 11 M-11 0 L11 0" opacity=".42" />
        </g>
        <g
          transform={"translate(" + (width * (portrait ? 0.82 : 0.12)) + " " + (height * (portrait ? 0.73 : 0.83)) + ")"}
          fill="none"
          stroke={data.accent}
          strokeWidth="1.8"
          opacity=".32"
        >
          <circle r={portrait ? 24 : 31} strokeDasharray="2 8" />
          <circle r={portrait ? 15 : 20} />
          <path d="M-7 0 Q0 -8 7 0 Q0 8 -7 0Z" />
        </g>

        {data.id === "opening" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.18)) + " " + (height * (portrait ? 0.88 : 0.77)) + ") scale(" + (portrait ? 0.62 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".56">
            <path d="M0 34 L48 -4 L96 34 M12 25 V82 H84 V25" />
            <path d="M39 82 V48 H58 V82 M24 43 H35 V54 H24Z M63 43 H74 V54 H63Z" />
            <path d="M105 0 C120 -15 136 -15 148 0 M120 -18 l0 -13 M146 -11 l10 -9" strokeWidth="2" />
            <path d="M148 35 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" strokeWidth="2" />
          </g>
        )}
        {data.id === "familiar" && (
          <g transform={"translate(" + (width * (portrait ? 0.72 : 0.72)) + " " + (height * (portrait ? 0.49 : 0.76)) + ")"} fill="none" stroke={data.accent} strokeWidth="2.5" strokeLinecap="round" opacity=".5">
            <path d="M-110 30 C-58 -28 -18 66 34 6 S100 -25 132 21" strokeDasharray="3 12" />
            <circle cx="-110" cy="30" r="8" fill={data.paper} />
            <circle cx="34" cy="6" r="8" fill={data.paper} />
            <circle cx="132" cy="21" r="8" fill={data.paper} />
            <path d="M-3 -45 l7 17 18 7 -18 7 -7 18 -7 -18 -18 -7 18 -7Z" strokeWidth="2" />
          </g>
        )}
        {data.id === "laugh" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.12)) + " " + (height * (portrait ? 0.82 : 0.77)) + ") scale(" + (portrait ? 0.72 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="3" strokeLinecap="round" opacity=".55">
            <path d="M0 -45 l0 18 M0 28 l0 18 M-45 0 h18 M28 0 h18 M-31 -31 l13 13 M18 18 l13 13 M31 -31 L18 -18 M-18 18 l-13 13" />
            <path d="M64 -16 C83 -37 97 -34 104 -19 C112 -3 94 5 80 -2 C69 -8 57 1 65 14 C76 31 98 30 111 17" strokeWidth="2.5" />
            <circle cx="128" cy="-27" r="4" fill={data.accent} />
            <circle cx="145" cy="10" r="3" fill={data.accent} />
          </g>
        )}
        {data.id === "together" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.16)) + " " + (height * (portrait ? 0.83 : 0.80)) + ") scale(" + (portrait ? 0.70 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".56">
            <path d="M-35 0 H35 L27 54 H-27Z M35 10 H45 C65 10 65 37 39 37" />
            <path d="M-17 -13 C-30 -31 -3 -36 -14 -57 M10 -13 C-2 -31 25 -37 15 -59" strokeWidth="2.3" />
            <path d="M-50 64 H56" strokeWidth="2" />
            <path d="M-49 54 q-10 13 0 26 M56 54 q10 13 0 26" strokeWidth="2" />
          </g>
        )}
        {data.id === "backyard" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.14)) + " " + (height * (portrait ? 0.84 : 0.80)) + ") scale(" + (portrait ? 0.68 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".56">
            <path d="M-80 48 Q-38 4 0 48 Q43 -3 88 48" />
            <path d="M-80 61 Q-30 28 0 61 Q44 21 88 61" strokeWidth="1.8" />
            <path d="M0 38 C-12 11 -3 -10 17 -29 M6 20 C-15 20 -30 8 -29 -9 C-10 -14 1 -1 6 20Z M10 2 C26 1 39 -10 38 -24 C22 -27 11 -14 10 2Z" />
            <circle cx="93" cy="-14" r="17" />
            <path d="M93 -41 v-9 M93 4 v9 M66 -14 h-9 M129 -14 h-9 M74 -33 l-7 -7 M112 -33 l7 -7" strokeWidth="2" />
          </g>
        )}
        {data.id === "memory" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.83)) + " " + (height * (portrait ? 0.84 : 0.78)) + ") scale(" + (portrait ? 0.66 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" opacity=".55">
            <path d="M0 -47 C-25 -47 -39 -27 -39 -6 C-39 22 0 55 0 55 S39 22 39 -6 C39 -27 25 -47 0 -47Z" />
            <circle cy="-8" r="12" />
            <path d="M56 -35 C76 -17 82 0 66 16 M66 16 l-13 -2 M66 16 l4 -13 M-59 48 C-43 29 -28 29 -16 43" strokeDasharray="4 8" />
            <path d="M-79 -39 l5 12 13 5 -13 5 -5 12 -5 -12 -13 -5 13 -5Z" strokeWidth="2" />
          </g>
        )}
        {data.id === "end" && (
          <g transform={"translate(" + (width * (portrait ? 0.80 : 0.17)) + " " + (height * (portrait ? 0.85 : 0.80)) + ") scale(" + (portrait ? 0.66 : 1) + ")"} fill="none" stroke={data.accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity=".58">
            <path d="M-74 0 Q-112 -34 -132 -4 Q-112 26 -74 0Z M74 0 Q112 -34 132 -4 Q112 26 74 0Z" />
            <path d="M-74 0 Q0 -56 74 0 Q0 56 -74 0Z" />
            <path d="M0 -29 l9 19 21 3 -15 14 4 21 -19 -10 -19 10 4 -21 -15 -14 21 -3Z" fill={data.paper} />
            <path d="M-114 46 Q-56 78 0 60 Q56 78 114 46" strokeWidth="2" />
          </g>
        )}
      </svg>

      <div style={{
        position: "absolute",
        left: portrait ? 48 : 76,
        top: portrait ? 66 : 68,
        display: "flex",
        alignItems: "center",
        gap: portrait ? 9 : 12,
        color: data.accent,
        fontFamily: "Arial, sans-serif",
        fontSize: portrait ? 10 : 13,
        fontWeight: 800,
        letterSpacing: ".22em",
        opacity: .84,
        textTransform: "uppercase",
      }}>
        <span style={{ width: portrait ? 23 : 34, height: 1, background: data.accent }} />
        {({
          opening: "A PLACE TO LAND",
          familiar: "THE FIRST HELLOS",
          laugh: "THE GOOD KIND OF CHAOS",
          together: "SLOW DAYS, SOFT NIGHTS",
          backyard: "A WORLD OF OUR OWN",
          memory: "SAVED FOR LATER",
          end: "ALWAYS A LITTLE HOME",
        } as Record<string, string>)[data.id]}
      </div>

      <div style={{
        position: "absolute",
        right: portrait ? 45 : 72,
        top: portrait ? 66 : 68,
        color: data.accent,
        opacity: .72,
        fontFamily: "Georgia, serif",
        fontSize: portrait ? 16 : 21,
        fontStyle: "italic",
        letterSpacing: ".04em",
        transform: "rotate(3deg)",
      }}>
        no. 0{index + 1}
      </div>

      <div style={{
        position: "absolute",
        left: portrait ? 46 : 74,
        bottom: portrait ? 76 : 67,
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: .7,
        color: data.accent,
        fontFamily: "Georgia, serif",
        fontSize: portrait ? 12 : 15,
        fontStyle: "italic",
      }}>
        <span style={{ width: portrait ? 24 : 38, height: 1, background: data.accent }} />
        {({
          opening: "leave a light on",
          familiar: "somehow, we found each other",
          laugh: "not pictured: the group chat",
          together: "no plans. no rush.",
          backyard: "just one more sunset",
          memory: "kept in the little archive",
          end: "come as you are, stay awhile",
        } as Record<string, string>)[data.id]}
      </div>
    </AbsoluteFill>
  );
};

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
        position: "absolute", inset: 0,
        background: index % 2 === 0 ? "#E8D9C5" : "#E2D2BF",
        transform: "translate(7px,9px) rotate(" + (index % 2 === 0 ? 1.4 : -1.6) + "deg)",
        boxShadow: "0 18px 34px rgba(40,29,21,.16)",
        zIndex: 0,
      }} />
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", height: "100%", overflow: "hidden",
        background: "#E8DCCB", border: "1px solid rgba(79,58,42,.12)",
        boxShadow: "inset 0 0 0 4px rgba(255,255,255,.25)",
      }}>
        <Img src={staticFile(photo.src)} style={{
          width: "100%", height: "100%", display: "block",
          objectFit: photo.contain ? "contain" : "cover",
          padding: photo.contain ? "8%" : 0,
          boxSizing: "border-box",
          background: photo.contain ? "#EADBC8" : "#D8C8B5",
          filter: "saturate(1.08) contrast(1.025) sepia(.035)",
        }} />
      </div>
      <div style={{
        position: "absolute", left: portrait ? 14 : 19, right: portrait ? 12 : 17,
        bottom: portrait ? 9 : 12, height: portrait ? 24 : 28, zIndex: 2,
        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        color: "#655044", fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: portrait ? 15 : 18, fontStyle: "italic",
        lineHeight: portrait ? "24px" : "28px",
      }}>{photo.label}</div>
      <div style={{
        position: "absolute", left: "34%", top: portrait ? -9 : -11,
        width: portrait ? 92 : 126, height: portrait ? 19 : 25,
        background: index % 2 === 0 ? "rgba(214,177,119,.78)" : "rgba(194,142,130,.62)",
        transform: "rotate(" + (index % 2 === 0 ? -4 : 3) + "deg)",
        boxShadow: "0 2px 5px rgba(65,46,30,.12)",
        zIndex: 4,
      }}>
        <div style={{ position: "absolute", inset: "3px 7px", borderLeft: "1px solid rgba(255,255,255,.34)", borderRight: "1px solid rgba(255,255,255,.34)" }} />
      </div>
      <div style={{
        position: "absolute", right: portrait ? 13 : 18, top: portrait ? 15 : 20,
        width: portrait ? 27 : 34, height: portrait ? 27 : 34,
        borderRadius: "50%", border: "1px solid rgba(129,91,68,.42)",
        background: "rgba(255,248,235,.88)", color: "#8A6450",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif", fontSize: portrait ? 13 : 16,
        transform: "rotate(8deg)", zIndex: 5,
        boxShadow: "0 2px 7px rgba(57,40,28,.12)",
      }}>✳</div>
      <div style={{
        position: "absolute", left: portrait ? 13 : 18, top: portrait ? 15 : 20,
        padding: portrait ? "4px 6px" : "5px 8px",
        background: "rgba(255,248,235,.88)", border: "1px solid rgba(129,91,68,.20)",
        color: "#886B58", fontFamily: "Arial, sans-serif",
        fontSize: portrait ? 7 : 9, fontWeight: 800, letterSpacing: ".12em",
        transform: "rotate(-2deg)", zIndex: 5,
      }}>C★ ARCHIVE</div>
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
  index: number;
}> = ({ data, portrait, frame, index }) => {
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
      background: "linear-gradient(145deg, " + data.paper + " 0%, #F2E5D3 100%)",
      border: "1px solid rgba(108,78,55,.24)",
      boxShadow: "0 24px 64px rgba(31,23,17,.22), 0 4px 12px rgba(31,23,17,.09), inset 0 0 0 5px rgba(255,255,255,.32)",
      borderRadius: 4,
      opacity: reveal,
      overflow: "visible",
      transform: "translateY(" + ((1 - reveal) * 52) + "px) rotate(" +
        (data.panelTilt + (1 - reveal) * 4) + "deg) scale(" + (0.94 + reveal * 0.06) + ")",
      zIndex: 12,
    }}>
      <div style={{
        position: "absolute", inset: portrait ? 8 : 10,
        border: "1px solid rgba(132,101,75,.15)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: portrait ? 17 : 22, top: portrait ? 7 : 10,
        color: data.accent, opacity: .10,
        fontFamily: "Georgia, serif", fontWeight: 700,
        fontSize: portrait ? 76 : 112, lineHeight: 1,
        letterSpacing: "-.08em", pointerEvents: "none",
      }}>0{index + 1}</div>
      <div style={{
        position: "absolute", top: -11, left: portrait ? "38%" : "42%",
        width: portrait ? 92 : 132, height: portrait ? 19 : 24,
        background: "rgba(213,178,132,.72)",
        transform: "rotate(-2.5deg)",
        boxShadow: "0 2px 6px rgba(55,38,25,.12)",
      }} />
      <div style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: 10,
        fontFamily: "Arial, sans-serif", fontWeight: 800,
        fontSize: portrait ? 12 : 14, letterSpacing: ".19em",
        color: data.accent, marginBottom: portrait ? 15 : 18,
        textTransform: "uppercase",
      }}>
        <span style={{
          width: portrait ? 24 : 32, height: portrait ? 24 : 32,
          border: "1px solid " + data.accent, borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Georgia, serif", fontSize: portrait ? 13 : 16,
          transform: "rotate(-9deg)",
        }}>✳</span>
        {data.eyebrow}
      </div>
      <div style={{
        position: "relative",
        color: data.ink, fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: titleSize, fontWeight: 700, lineHeight: 0.94,
        letterSpacing: "-.06em", whiteSpace: "pre-line",
        textShadow: "0 1px 0 rgba(255,255,255,.42)",
      }}>{data.title}</div>
      <svg width={portrait ? 146 : 190} height="22" viewBox="0 0 190 22" style={{ display: "block", marginTop: portrait ? 14 : 18, overflow: "visible" }}>
        <path d="M3 13 C36 5 69 18 102 10 S158 7 186 11" fill="none" stroke={data.accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M12 19 C50 14 91 21 134 15" fill="none" stroke={data.accent} strokeWidth="1" opacity=".45" strokeLinecap="round" />
      </svg>
      <div style={{
        marginTop: portrait ? 13 : 17,
        fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic",
        fontSize: portrait ? 18 : 22,
        lineHeight: 1.36, color: "#6E5B4E", maxWidth: "96%",
        position: "relative",
      }}>{data.note}</div>
      <div style={{
        display: "flex", alignItems: "center", gap: 9,
        marginTop: portrait ? 18 : 22,
        color: data.accent, opacity: .78,
        fontFamily: "Arial, sans-serif", fontSize: portrait ? 9 : 11,
        fontWeight: 800, letterSpacing: ".19em",
      }}>
        <span style={{ width: portrait ? 25 : 36, height: 1, background: data.accent }} />
        THE COTTAGE★ · A LITTLE ARCHIVE
      </div>
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

const Scene: React.FC<{ data: SceneData; portrait: boolean; index: number }> = ({ data, portrait, index }) => {
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
        <SceneOrnaments data={data} frame={frame} portrait={portrait} index={index} />
        {data.photos.map((photo, index) => (
          <PhotoCard key={photo.src} photo={photo} index={index}
            portrait={portrait} frame={frame} />
        ))}
        <Scribbles accent={data.accent} frame={frame} portrait={portrait} />
        <CopyPanel data={data} portrait={portrait} frame={frame} index={index} />
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
      {scenes.map((data, index) => {
        const start = from;
        from += data.seconds * fps - Math.round(fps * 0.3);
        return (
          <Sequence key={data.id} from={start} durationInFrames={data.seconds * fps} name={data.id}>
            <Scene data={data} portrait={portrait} index={index} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
