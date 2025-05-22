import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Import types
import { RootStackParamList } from '../types/navigation';
import { styles } from '../styles/settingsScreenStyles';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsItem {
  id: string;
  title: string;
  screen: keyof RootStackParamList;
}

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  // Toggles for dark mode and large text
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // Settings menu items
  const settingsItems: SettingsItem[] = [
    { id: 'alerts', title: 'Alerts', screen: 'AlertSettings' },
    { id: 'safety', title: 'Safety', screen: 'SafetySettings' },
    { id: 'display', title: 'Display', screen: 'DisplaySettings' },
    { id: 'theme', title: 'Theme', screen: 'ThemeSettings' },
    { id: 'data', title: 'Data', screen: 'DataSettings' },
    { id: 'language', title: 'Language', screen: 'LanguageSettings' },
    { id: 'privacy', title: 'Privacy & Security', screen: 'PrivacySettings' },
  ];

  // Navigate back to previous screen
  const handleGoBack = (): void => {
    navigation.goBack();
  };

  // Navigate to a settings sub-screen
  const navigateToSettingsScreen = (screen: keyof RootStackParamList): void => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F7" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={28} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Toggles Section */}
          <View style={styles.togglesSection}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Large Text</Text>
              <Switch value={largeText} onValueChange={setLargeText} />
            </View>
          </View>

          {/* Settings List */}
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.settingsItem,
                index === settingsItems.length - 1 ? styles.lastItem : null
              ]}
              onPress={() => navigateToSettingsScreen(item.screen)}
            >
              <Text style={styles.settingsItemTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen; 