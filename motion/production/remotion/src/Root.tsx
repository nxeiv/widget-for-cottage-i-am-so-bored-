import React from "react";
import { Composition } from "remotion";
import { CottageIntro } from "./CottageIntro";

const MASTER_FPS = 120;
const COMPAT_FPS = 60;
const DURATION_SECONDS = 45;

export const Root: React.FC = () => (
  <>
    <Composition
      id="CottageIntro"
      component={CottageIntro}
      durationInFrames={DURATION_SECONDS * MASTER_FPS}
      fps={MASTER_FPS}
      width={1920}
      height={1080}
      defaultProps={{ portrait: false }}
    />
    <Composition
      id="CottageIntroPortrait"
      component={CottageIntro}
      durationInFrames={DURATION_SECONDS * MASTER_FPS}
      fps={MASTER_FPS}
      width={1080}
      height={1920}
      defaultProps={{ portrait: true }}
    />
    <Composition
      id="CottageIntro60"
      component={CottageIntro}
      durationInFrames={DURATION_SECONDS * COMPAT_FPS}
      fps={COMPAT_FPS}
      width={1920}
      height={1080}
      defaultProps={{ portrait: false }}
    />
    <Composition
      id="CottageIntroPortrait60"
      component={CottageIntro}
      durationInFrames={DURATION_SECONDS * COMPAT_FPS}
      fps={COMPAT_FPS}
      width={1080}
      height={1920}
      defaultProps={{ portrait: true }}
    />
  </>
);
