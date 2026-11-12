import { Config } from "@remotion/cli/config";

// Read media directly from the website repository's existing Media/ folder.
// The package is run from motion/production/remotion, so ../../../ is the repo root.
Config.setPublicDir("../../../");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
