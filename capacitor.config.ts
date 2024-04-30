import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "Snag Sniper",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      // launchShowDuration: 3000,
      showSpinner: true,
      launchAutoHide: true,
      // androidScaleType: "CENTER_CROP",
      // splashImmersive: true,
      backgroundColor: "#ffdfb1",
    },
  },
};

export default config;
