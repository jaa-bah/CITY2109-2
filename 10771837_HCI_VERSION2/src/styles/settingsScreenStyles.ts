// src/styles/SettingsScreenStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  rightPlaceholder: {
    width: 28, // Same width as the back button icon for balanced layout
  },
  scrollView: {
    flex: 1,
  },
  scrollViewSettings: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingsItemTitle: {
    fontSize: 17,
    color: '#000',
  },
  // Settings page specific styles
  settingSection: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  frequencyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  frequencyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  frequencyButtonTextActive: {
    color: 'white',
  },
  togglesSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#222',
  },
});