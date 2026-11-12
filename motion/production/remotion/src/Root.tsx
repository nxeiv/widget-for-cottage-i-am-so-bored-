import React from "react";
import { Composition } from "remotion";
import { CottageIntro } from "./CottageIntro";

const FPS = 120;
const DURATION = 45 * FPS;

export const Root: React.FC = () => (
  <>
    <Composition id="CottageIntro" component={CottageIntro} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} defaultProps={{ portrait: false }} />
    <Composition id="CottageIntroPortrait" component={CottageIntro} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={{ portrait: true }} />
  </>
);