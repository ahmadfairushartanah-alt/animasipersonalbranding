import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);

// Guna Chromium yang sudah dipasang (environment cloud) jika ada.
const localShell =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
if (fs.existsSync(localShell)) {
  Config.setBrowserExecutable(localShell);
}
