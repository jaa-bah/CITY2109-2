/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 */
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add additional asset extensions
config.resolver.assetExts.push('cjs');

module.exports = config;