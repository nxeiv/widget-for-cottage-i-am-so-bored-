import React from "react";
import { Composition } from "remotion";
import { CottageIntro } from "./CottageIntro";

const FPS = 120;
const DURATION_IN_FRAMES = 45 * FPS;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="CottageIntro"
        component={CottageIntro}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ vertical: false }}
      />
      <Composition
        id="CottageIntroVertical"
        component={CottageIntro}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ vertical: true }}
      />
    </>
  );
};