// src/components/mapTopographicView.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Earthquake } from '../types/navigation';
import { styles } from '../styles/mapViewStyles';

interface MapTopographicViewProps {
  earthquakes: Earthquake[];
  onMarkerPress: (earthquakeId: string) => void;
}

const MapTopographicView: React.FC<MapTopographicViewProps> = ({ 
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

  // Custom map style for topographic view
  const customMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e6efe2"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#f5f5dc"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffe4b5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c2e6b7"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c1e0f5"
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        customMapStyle={customMapStyle}
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

export default MapTopographicView;