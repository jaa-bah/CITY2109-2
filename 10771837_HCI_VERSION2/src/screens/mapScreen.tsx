// src/screens/mapScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Import components
import GlobeView from '../components/globeView';
import MapSatelliteView from '../components/mapSatalliteView';
import MapTopographicView from '../components/mapTopographicView';
import MapTerrainView from '../components/mapTerrainView';
import MapListView from '../components/mapListView';
import Legend from '../components/legend';
import FilterModal from '../components/filterModal';
import MapViewDropdown, { MapViewType } from '../components/mapViewDropdown';

// Import types and context
import { RootStackParamList } from '../types/navigation';
import { useEarthquakes } from '../contexts/earthquakeContext';
import { styles } from '../styles/mapScreenStyles';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { earthquakes, loading, error, refreshData } = useEarthquakes();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [isViewDropdownVisible, setIsViewDropdownVisible] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<MapViewType>('3D');

  // Handle refresh
  const handleRefresh = (): void => {
    refreshData();
  };

  // Handle filter toggle
  const toggleFilterModal = (): void => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  // Handle view dropdown toggle
  const toggleViewDropdown = (): void => {
    setIsViewDropdownVisible(!isViewDropdownVisible);
  };

  // Handle view type selection
  const handleViewTypeSelect = (viewType: MapViewType): void => {
    setCurrentView(viewType);
  };

  // Handle settings navigation
  const navigateToSettings = (): void => {
    navigation.navigate('Settings');
  };

  // Handle search
  const handleSearch = (): void => {
    // Implement search functionality
    console.log('Search pressed');
  };

  // Get the current view label
  const getCurrentViewLabel = (): string => {
    switch (currentView) {
      case '3D':
        return '3D View';
      case 'Satellite':
        return 'Satellite View';
      case 'Topographic':
        return 'Topographic View';
      case 'Terrain':
        return 'Terrain View';
      case 'List':
        return 'List View';
      default:
        return 'Earthquake View';
    }
  };

  // Render the appropriate map view based on current selection
  const renderMapView = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading earthquake data...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (currentView) {
      case '3D':
        return (
          <GlobeView 
            earthquakes={earthquakes} 
            is3D={true}
            onMarkerPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
      case 'Satellite':
        return (
          <MapSatelliteView
            earthquakes={earthquakes}
            onMarkerPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
      case 'Topographic':
        return (
          <MapTopographicView
            earthquakes={earthquakes}
            onMarkerPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
      case 'Terrain':
        return (
          <MapTerrainView
            earthquakes={earthquakes}
            onMarkerPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
      case 'List':
        return (
          <MapListView
            earthquakes={earthquakes}
            onItemPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
      default:
        return (
          <GlobeView 
            earthquakes={earthquakes} 
            is3D={true}
            onMarkerPress={(earthquakeId: string) => {
              navigation.navigate('EarthquakeDetail', { earthquakeId });
            }}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F7" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton} onPress={navigateToSettings}>
            <Ionicons name="settings" size={28} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Quake</Text>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={28} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* View Header */}
        <View style={styles.viewHeader}>
          <TouchableOpacity style={styles.viewSelectorButton} onPress={toggleViewDropdown}>
            <Text style={styles.viewTitle}>{getCurrentViewLabel()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
            <MaterialIcons name="filter-list" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Map Container */}
        <View style={styles.mapContainer}>
          {renderMapView()}
        </View>

        {/* Legend - Only show for map views, not list view */}
        {currentView !== 'List' && <Legend />}

        {/* Info Button */}
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle" size={28} color="#007AFF" />
        </TouchableOpacity>

        {/* Filter Modal */}
        <FilterModal 
          visible={isFilterModalVisible} 
          onClose={toggleFilterModal} 
        />

        {/* View Dropdown */}
        <MapViewDropdown
          visible={isViewDropdownVisible}
          currentView={currentView}
          onClose={toggleViewDropdown}
          onSelectView={handleViewTypeSelect}
        />
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;