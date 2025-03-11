const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "glb", "obj", "gltf", "fbx"],
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
