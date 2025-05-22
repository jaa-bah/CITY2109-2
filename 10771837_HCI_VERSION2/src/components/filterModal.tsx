// src/components/filterModel.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEarthquakes } from '../contexts/earthquakeContext';
import { FilterModalProps, EarthquakeFilters, Region } from '../types/navigation';
import { styles } from '../styles/filterModelStyles';

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const { filters, updateFilters } = useEarthquakes();
  
  // Local state to track changes before applying
  const [localFilters, setLocalFilters] = useState<EarthquakeFilters>(filters);
  const [useCustomRegion, setUseCustomRegion] = useState<boolean>(!!filters.region);

  // Reset filters to initial values
  const resetFilters = (): void => {
    const defaultFilters: EarthquakeFilters = {
      minMagnitude: 2.5,
      timeRange: 30,
      region: null,
    };
    
    setLocalFilters(defaultFilters);
    setUseCustomRegion(false);
  };

  // Apply current filters and close modal
  const applyFilters = (): void => {
    // If custom region is not enabled, set region to null
    const updatedFilters = {
      ...localFilters,
      region: useCustomRegion ? localFilters.region : null,
    };
    
    updateFilters(updatedFilters);
    onClose();
  };

  // Update local magnitude filter
  const handleMagnitudeChange = (value: number): void => {
    setLocalFilters({
      ...localFilters,
      minMagnitude: Math.round(value * 10) / 10, // Round to 1 decimal place
    });
  };

  // Update local time range filter
  const handleTimeRangeChange = (value: number): void => {
    setLocalFilters({
      ...localFilters,
      timeRange: Math.round(value),
    });
  };

  // Toggle custom region
  const toggleCustomRegion = (value: boolean): void => {
    setUseCustomRegion(value);
    
    if (value && !localFilters.region) {
      // Initialize region if it doesn't exist
      setLocalFilters({
        ...localFilters,
        region: {
          latitude: 0,
          longitude: 0,
          radius: 500, // Default 500km radius
        },
      });
    }
  };

  // Update region latitude
  const handleLatitudeChange = (text: string): void => {
    const value = parseFloat(text);
    if (!isNaN(value) && localFilters.region) {
      setLocalFilters({
        ...localFilters,
        region: {
          ...localFilters.region,
          latitude: value,
        },
      });
    }
  };

  // Update region longitude
  const handleLongitudeChange = (text: string): void => {
    const value = parseFloat(text);
    if (!isNaN(value) && localFilters.region) {
      setLocalFilters({
        ...localFilters,
        region: {
          ...localFilters.region,
          longitude: value,
        },
      });
    }
  };

  // Update region radius
  const handleRadiusChange = (value: number): void => {
    if (localFilters.region) {
      setLocalFilters({
        ...localFilters,
        region: {
          ...localFilters.region,
          radius: Math.round(value),
        },
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter Earthquakes</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Content */}
          <ScrollView style={styles.scrollView}>
            {/* Magnitude Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Minimum Magnitude</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={9}
                  step={0.1}
                  value={localFilters.minMagnitude}
                  onValueChange={handleMagnitudeChange}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#CCCCCC"
                  thumbTintColor="#007AFF"
                />
                <Text style={styles.sliderValue}>{localFilters.minMagnitude.toFixed(1)}</Text>
              </View>
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>1.0</Text>
                <Text style={styles.sliderLabel}>9.0</Text>
              </View>
            </View>

            {/* Time Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Time Range (days)</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={365}
                  step={1}
                  value={localFilters.timeRange}
                  onValueChange={handleTimeRangeChange}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#CCCCCC"
                  thumbTintColor="#007AFF"
                />
                <Text style={styles.sliderValue}>{localFilters.timeRange}</Text>
              </View>
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>1 day</Text>
                <Text style={styles.sliderLabel}>1 year</Text>
              </View>
            </View>

            {/* Region Filter */}
            <View style={styles.filterSection}>
              <View style={styles.switchContainer}>
                <Text style={styles.filterTitle}>Custom Region</Text>
                <Switch
                  value={useCustomRegion}
                  onValueChange={toggleCustomRegion}
                  trackColor={{ false: '#CCCCCC', true: '#65C466' }}
                  thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
                  ios_backgroundColor="#CCCCCC"
                />
              </View>
              
              {useCustomRegion && (
                <View style={styles.regionInputs}>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Latitude:</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={localFilters.region?.latitude.toString()}
                      onChangeText={handleLatitudeChange}
                      placeholder="Latitude (-90 to 90)"
                    />
                  </View>
                  <View style={styles.inputRow}>
                    <Text style={styles.inputLabel}>Longitude:</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={localFilters.region?.longitude.toString()}
                      onChangeText={handleLongitudeChange}
                      placeholder="Longitude (-180 to 180)"
                    />
                  </View>
                  <Text style={styles.radiusLabel}>
                    Radius: {localFilters.region?.radius} km
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={100}
                    maximumValue={5000}
                    step={50}
                    value={localFilters.region?.radius || 500}
                    onValueChange={handleRadiusChange}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#CCCCCC"
                    thumbTintColor="#007AFF"
                  />
                  <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>100km</Text>
                    <Text style={styles.sliderLabel}>5000km</Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;