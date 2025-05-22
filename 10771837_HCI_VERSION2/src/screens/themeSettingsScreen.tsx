// src/screens/themeSettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/settingsScreenStyles';

// Additional theme-specific styles
const themeStyles = {
  themeOption: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  checkmark: {
    marginLeft: 'auto' as const,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
};

// Theme options interface
interface ThemeOption {
  id: string;
  name: string;
  color: string;
}

const ThemeSettingsScreen: React.FC = () => {
  // State for theme settings
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [useSystemTheme, setUseSystemTheme] = useState<boolean>(true);
  const [selectedTheme, setSelectedTheme] = useState<string>('blue');

  // Theme color options
  const themeOptions: ThemeOption[] = [
    { id: 'blue', name: 'Blue', color: '#007AFF' },
    { id: 'green', name: 'Green', color: '#34C759' },
    { id: 'purple', name: 'Purple', color: '#AF52DE' },
    { id: 'orange', name: 'Orange', color: '#FF9500' },
    { id: 'red', name: 'Red', color: '#FF3B30' },
    { id: 'black', name: 'Dark', color: '#1C1C1E' },
  ];

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode(previous => !previous);
  };

  // Toggle system theme
  const toggleUseSystemTheme = (): void => {
    setUseSystemTheme(previous => !previous);
    // If enabling system theme, disable manual dark mode toggle
    if (!useSystemTheme) {
      setDarkMode(false);
    }
  };

  // Select a theme
  const selectTheme = (themeId: string): void => {
    setSelectedTheme(themeId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewSettings}>
        {/* System Theme */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Use System Theme</Text>
            <Switch
              value={useSystemTheme}
              onValueChange={toggleUseSystemTheme}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Automatically switch between light and dark mode based on your device settings
          </Text>
        </View>

        {/* Dark Mode Toggle (only if system theme is disabled) */}
        {!useSystemTheme && (
          <View style={styles.settingSection}>
            <View style={styles.settingRow}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#CCCCCC', true: '#65C466' }}
                thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
                ios_backgroundColor="#CCCCCC"
              />
            </View>
          </View>
        )}

        {/* Accent Color Theme */}
        <View style={styles.settingSection}>
          <Text style={[styles.settingTitle, { marginBottom: 15 }]}>App Theme</Text>

          {themeOptions.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={themeStyles.themeOption}
              onPress={() => selectTheme(theme.id)}
            >
              <View
                style={[themeStyles.colorPreview, { backgroundColor: theme.color }]}
              />
              <Text style={styles.settingItemTitle}>{theme.name}</Text>
              {selectedTheme === theme.id && (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color="#007AFF"
                  style={themeStyles.checkmark}
                />
              )}
            </TouchableOpacity>
          ))}
          
          <Text style={styles.settingDescription}>
            Set the primary color for the app interface
          </Text>
        </View>

        {/* Map Display Type */}
        <View style={styles.settingSection}>
          <Text style={[styles.settingTitle, { marginBottom: 15 }]}>Default Map View</Text>
          
          <TouchableOpacity
            style={themeStyles.themeOption}
            onPress={() => {}}
          >
            <Ionicons name="globe-outline" size={24} color="#000" style={{ marginRight: 15 }} />
            <Text style={styles.settingItemTitle}>3D Globe</Text>
            <Ionicons
              name="checkmark"
              size={24}
              color="#007AFF"
              style={themeStyles.checkmark}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={themeStyles.themeOption}
            onPress={() => {}}
          >
            <Ionicons name="map-outline" size={24} color="#000" style={{ marginRight: 15 }} />
            <Text style={styles.settingItemTitle}>2D Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThemeSettingsScreen;