const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Enable symlink support and ensure node_modules resolution
config.resolver.unstable_enableSymlinks = true;
config.watchFolders = [__dirname];

module.exports = withNativeWind(config, {
  input: "./global.css",
  forceWriteFileSystem: true,
});
