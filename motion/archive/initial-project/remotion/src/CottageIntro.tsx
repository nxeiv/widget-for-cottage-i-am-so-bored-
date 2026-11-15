import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type IntroProps = { vertical: boolean };

type SceneDefinition = {
  name: string;
  seconds: number;
  landscape: string;
  portrait: string;
};

const SCENES: SceneDefinition[] = [
  { name: "Opening — The Cottage", seconds: 5, landscape: "scenes/scene-01-opening.svg", portrait: "scenes/vertical-01-opening.svg" },
  { name: "From different places", seconds: 6, landscape: "scenes/scene-02-from-different-places.svg", portrait: "scenes/vertical-02-people.svg" },
  { name: "One little home", seconds: 6, landscape: "scenes/scene-03-one-home.svg", portrait: "scenes/vertical-03-one-home.svg" },
  { name: "Our corner", seconds: 7, landscape: "scenes/scene-04-our-corner.svg", portrait: "scenes/vertical-04-community.svg" },
  { name: "The backyard — SMP", seconds: 7, landscape: "scenes/scene-05-the-backyard.svg", portrait: "scenes/vertical-05-backyard.svg" },
  { name: "Shared moments", seconds: 7, landscape: "scenes/scene-06-shared-moments.svg", portrait: "scenes/vertical-06-moments.svg" },
  { name: "Closing — The Cottage", seconds: 7, landscape: "scenes/scene-07-home-lockup.svg", portrait: "scenes/vertical-07-lockup.svg" },
];

const Scene: React.FC<{
  scene: SceneDefinition;
  vertical: boolean;
  durationInFrames: number;
}> = ({ scene, vertical, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Soft spring entrance, restrained camera drift, and a short dissolve at the cut.
  const entrance = interpolate(frame, [0, Math.round(fps * 0.55)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(
    frame,
    [durationInFrames - Math.round(fps * 0.22), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(entrance, exit);
  const drift = interpolate(frame, [0, durationInFrames], [1, 1.035]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#2D2923", opacity }}>
      <Img
        src={staticFile(vertical ? scene.portrait : scene.landscape)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
          transform: `scale(${drift})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const CottageIntro: React.FC<IntroProps> = ({ vertical }) => {
  const { fps } = useVideoConfig();
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#2D2923" }}>
      {SCENES.map((scene) => {
        const durationInFrames = scene.seconds * fps;
        const sequenceFrom = from;
        from += durationInFrames;

        return (
          <Sequence
            key={scene.name}
            from={sequenceFrom}
            durationInFrames={durationInFrames}
            name={scene.name}
          >
            <Scene
              scene={scene}
              vertical={vertical}
              durationInFrames={durationInFrames}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};