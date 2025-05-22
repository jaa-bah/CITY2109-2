# Earthquake App

A React Native mobile application that displays real-time earthquake data from the USGS (United States Geological Survey) API. The app provides comprehensive earthquake monitoring with multiple view options and detailed information about seismic activities.

## Features

- Real-time earthquake data from USGS
- Multiple map view options:
  - Standard map view
  - Satellite view
  - Terrain view
  - Topographic view
  - Globe view
- Interactive map with earthquake markers
- Detailed earthquake information including:
  - Magnitude
  - Location
  - Depth
  - Relative time
  - Coordinates
- Filter functionality for earthquake data
- Color-coded magnitude indicators
- Pull-to-refresh functionality
- Settings management for:
  - Theme preferences
  - Alert configurations
  - Safety guidelines
- Responsive and modern UI design

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) - version 14.0.0 or higher
- [npm](https://www.npmjs.com/) - usually comes with Node.js
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) - for Android development
- [Expo Go](https://expo.dev/client) - app on your mobile device, or vm in AVD manager

## Installation

1. Clone the repository:
git clone [repository-url]
cd EarthquakeApp

2. Install dependencies:
npm install

3. Install specific dependencies:
npx expo install expo-status-bar @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-maps react-native-vector-icons react-native-gesture-handler react-native-reanimated @react-native-community/slider


## Running the App

1. Start the development server:
npx expo start

2. Run on Android:
- Press 'a' in the terminal to open in Android emulator
- Or scan the QR code with Expo Go app on your physical device

3. Run on iOS:
- Press 'i' in the terminal to open in iOS simulator
- Or scan the QR code with Expo Go app on your physical device

## Troubleshooting

If you encounter any issues:

1. Clear the Metro bundler cache:
npx expo start --clear

2. Remove node_modules and reinstall:
rm -rf node_modules
npm install

3. Make sure all dependencies are properly installed:
npx expo install --fix

4. Check for TypeScript errors:
npx tsc --noEmit

## API Reference

The app uses the USGS Earthquake API:
- Endpoint: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
- Documentation: https://earthquake.usgs.gov/fdsnws/event/1/
