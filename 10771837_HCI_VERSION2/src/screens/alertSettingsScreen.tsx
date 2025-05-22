// src/screens/alertSettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../styles/settingsScreenStyles';

const AlertSettingsScreen: React.FC = () => {
  // State for alert settings
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);
  const [notificationSound, setNotificationSound] = useState<boolean>(true);
  const [vibration, setVibration] = useState<boolean>(true);
  const [minMagnitude, setMinMagnitude] = useState<number>(4.5);
  const [maxDistance, setMaxDistance] = useState<number>(500); // km
  const [alertFrequency, setAlertFrequency] = useState<string>('real-time');

  // Toggle alert settings on/off
  const toggleAlertsEnabled = (): void => {
    setAlertsEnabled(previous => !previous);
  };

  // Toggle notification sound on/off
  const toggleNotificationSound = (): void => {
    setNotificationSound(previous => !previous);
  };

  // Toggle vibration on/off
  const toggleVibration = (): void => {
    setVibration(previous => !previous);
  };

  // Handle magnitude slider change
  const handleMagnitudeChange = (value: number): void => {
    setMinMagnitude(value);
  };

  // Handle distance slider change
  const handleDistanceChange = (value: number): void => {
    setMaxDistance(value);
  };

  // Handle alert frequency selection
  const handleFrequencySelect = (frequency: string): void => {
    setAlertFrequency(frequency);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewSettings}>
        {/* Main toggle for all alerts */}
        <View style={styles.settingSection}>
          <View style={styles.settingRow}>
            <Text style={styles.settingTitle}>Enable Earthquake Alerts</Text>
            <Switch
              value={alertsEnabled}
              onValueChange={toggleAlertsEnabled}
              trackColor={{ false: '#CCCCCC', true: '#65C466' }}
              thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
              ios_backgroundColor="#CCCCCC"
            />
          </View>
          <Text style={styles.settingDescription}>
            Receive notifications about earthquakes in your selected regions
          </Text>
        </View>

        {alertsEnabled && (
          <>
            {/* Notification Sound */}
            <View style={styles.settingSection}>
              <View style={styles.settingRow}>
                <Text style={styles.settingTitle}>Notification Sound</Text>
                <Switch
                  value={notificationSound}
                  onValueChange={toggleNotificationSound}
                  trackColor={{ false: '#CCCCCC', true: '#65C466' }}
                  thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
                  ios_backgroundColor="#CCCCCC"
                />
              </View>
            </View>

            {/* Vibration */}
            <View style={styles.settingSection}>
              <View style={styles.settingRow}>
                <Text style={styles.settingTitle}>Vibration</Text>
                <Switch
                  value={vibration}
                  onValueChange={toggleVibration}
                  trackColor={{ false: '#CCCCCC', true: '#65C466' }}
                  thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
                  ios_backgroundColor="#CCCCCC"
                />
              </View>
            </View>

            {/* Minimum Magnitude */}
            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Minimum Magnitude</Text>
              <Text style={styles.sliderValue}>{minMagnitude.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={2.0}
                maximumValue={9.0}
                step={0.1}
                value={minMagnitude}
                onValueChange={handleMagnitudeChange}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#CCCCCC"
                thumbTintColor="#007AFF"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>2.0</Text>
                <Text style={styles.sliderLabel}>9.0</Text>
              </View>
              <Text style={styles.settingDescription}>
                Only notify for earthquakes with magnitude at or above this value
              </Text>
            </View>

            {/* Maximum Distance */}
            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Maximum Distance</Text>
              <Text style={styles.sliderValue}>{maxDistance} km</Text>
              <Slider
                style={styles.slider}
                minimumValue={50}
                maximumValue={5000}
                step={50}
                value={maxDistance}
                onValueChange={handleDistanceChange}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#CCCCCC"
                thumbTintColor="#007AFF"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>50 km</Text>
                <Text style={styles.sliderLabel}>5000 km</Text>
              </View>
              <Text style={styles.settingDescription}>
                Only notify for earthquakes within this distance from your location
              </Text>
            </View>

            {/* Alert Frequency */}
            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Alert Frequency</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    alertFrequency === 'real-time' && styles.frequencyButtonActive
                  ]}
                  onPress={() => handleFrequencySelect('real-time')}
                >
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      alertFrequency === 'real-time' && styles.frequencyButtonTextActive
                    ]}
                  >
                    Real-time
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    alertFrequency === 'daily' && styles.frequencyButtonActive
                  ]}
                  onPress={() => handleFrequencySelect('daily')}
                >
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      alertFrequency === 'daily' && styles.frequencyButtonTextActive
                    ]}
                  >
                    Daily
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    alertFrequency === 'weekly' && styles.frequencyButtonActive
                  ]}
                  onPress={() => handleFrequencySelect('weekly')}
                >
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      alertFrequency === 'weekly' && styles.frequencyButtonTextActive
                    ]}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.settingDescription}>
                Choose how often you want to receive earthquake alerts
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertSettingsScreen;