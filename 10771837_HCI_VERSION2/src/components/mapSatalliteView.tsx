// src/components/mapSatelliteView.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MapTypes } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Earthquake } from '../types/navigation';
import { styles } from '../styles/mapViewStyles';

interface MapSatelliteViewProps {
  earthquakes: Earthquake[];
  onMarkerPress: (earthquakeId: string) => void;
}

const MapSatelliteView: React.FC<MapSatelliteViewProps> = ({ 
  earthquakes, 
  onMarkerPress 
}) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: -60, // Centered on the Americas as shown in screenshots
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  // Handle marker press
  const handleMarkerPress = (earthquakeId: string): void => {
    onMarkerPress(earthquakeId);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        mapType="satellite" // Set map type to satellite
      >
        {earthquakes.map((earthquake) => (
          <Marker
            key={earthquake.id}
            coordinate={{
              latitude: earthquake.latitude,
              longitude: earthquake.longitude,
            }}
            onPress={() => handleMarkerPress(earthquake.id)}
          >
            <View style={[styles.markerContainer, { backgroundColor: earthquake.color }]}>
              <Ionicons name="location" size={16} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapSatelliteView;