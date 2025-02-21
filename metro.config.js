// Learn more https://docs.expo.io/guides/customizing-metro
/* const { getDefaultConfig } = require('expo/metro-config'); */

// @type {import('expo/metro-config').MetroConfig} */
/* const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("glb");
config.resolver.assetExts.push("obj");
config.resolver.assetExts.push("gltf");
config.resolver.assetExts.push("fbx");

module.exports = config; */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
//const config = {};
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("glb");
config.resolver.assetExts.push("obj");
config.resolver.assetExts.push("gltf");
config.resolver.assetExts.push("fbx");

module.exports = mergeConfig(getDefaultConfig(__dirname), config);