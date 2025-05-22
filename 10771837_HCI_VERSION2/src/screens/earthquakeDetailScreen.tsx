// src/screens/earthquakeDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Import types and API services
import { RootStackParamList, Earthquake } from '../types/navigation';
import { getEarthquakeDetails } from '../services/earthquakeService';
import { styles } from '../styles/earthquakeDetailScreenStyles';

type EarthquakeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'EarthquakeDetail'
>;

type EarthquakeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EarthquakeDetail'
>;

interface EarthquakeDetailScreenProps {
  route: EarthquakeDetailScreenRouteProp;
  navigation: EarthquakeDetailScreenNavigationProp;
}

const EarthquakeDetailScreen: React.FC<EarthquakeDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { earthquakeId } = route.params;
  const [earthquake, setEarthquake] = useState<Earthquake | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch earthquake details
  useEffect(() => {
    const fetchEarthquakeDetails = async () => {
      try {
        setLoading(true);
        const data = await getEarthquakeDetails(earthquakeId);
        setEarthquake(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching earthquake details:', err);
        setError('Failed to load earthquake details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakeDetails();
  }, [earthquakeId]);

  // Open USGS webpage for this earthquake
  const openUSGSPage = () => {
    if (earthquake?.url) {
      Linking.openURL(earthquake.url).catch(() => {
        Alert.alert('Error', 'Could not open the USGS webpage.');
      });
    }
  };

  // Get magnitude description
  const getMagnitudeDescription = (magnitude: number): string => {
    if (magnitude < 2.5) return 'Minor';
    if (magnitude < 4.0) return 'Light';
    if (magnitude < 5.0) return 'Moderate';
    if (magnitude < 6.0) return 'Strong';
    if (magnitude < 7.0) return 'Major';
    return 'Great';
  };

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  };

  // Handle share button press
  const handleShare = () => {
    // Implement share functionality
    Alert.alert('Share', 'Share functionality will be implemented here.');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading earthquake details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !earthquake) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>{error || 'Earthquake not found'}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: earthquake.latitude,
              longitude: earthquake.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            zoomEnabled={true}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: earthquake.latitude,
                longitude: earthquake.longitude,
              }}
            >
              <View style={[styles.markerContainer, { backgroundColor: earthquake.color }]}>
                <Ionicons name="location" size={16} color="white" />
              </View>
            </Marker>
          </MapView>
        </View>

        {/* Earthquake Details */}
        <View style={styles.detailsContainer}>
          {/* Title */}
          <Text style={styles.title}>{earthquake.title}</Text>
          
          {/* Date and Place */}
          <View style={styles.section}>
            <Text style={styles.dateText}>{formatDate(earthquake.time)}</Text>
            <Text style={styles.placeText}>{earthquake.place}</Text>
          </View>

          {/* Magnitude */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.sectionTitle}>Magnitude</Text>
              <View style={[styles.magnitudeContainer, { backgroundColor: earthquake.color }]}>
                <Text style={styles.magnitudeText}>{earthquake.magnitude.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.magnitudeDescription}>
              {getMagnitudeDescription(earthquake.magnitude)}
            </Text>
          </View>

          {/* Depth */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Depth</Text>
            <Text style={styles.depthText}>{earthquake.depth.toFixed(1)} km</Text>
          </View>

          {/* Coordinates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coordinates</Text>
            <Text style={styles.coordinatesText}>
              {earthquake.latitude.toFixed(4)}°, {earthquake.longitude.toFixed(4)}°
            </Text>
          </View>

          {/* Tsunami Warning */}
          {earthquake.tsunami > 0 && (
            <View style={styles.tsunamiWarning}>
              <Ionicons name="warning" size={24} color="white" />
              <Text style={styles.tsunamiWarningText}>
                Tsunami Alert Issued
              </Text>
            </View>
          )}

          {/* Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <Text style={styles.statusText}>{earthquake.status}</Text>
          </View>

          {/* Reports */}
          {earthquake.felt !== null && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Felt Reports</Text>
              <Text style={styles.feltText}>
                {earthquake.felt} {earthquake.felt === 1 ? 'person' : 'people'} reported feeling this earthquake
              </Text>
            </View>
          )}

          {/* USGS Link */}
          <TouchableOpacity style={styles.linkButton} onPress={openUSGSPage}>
            <Text style={styles.linkButtonText}>View on USGS Website</Text>
            <Ionicons name="open-outline" size={18} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-outline" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EarthquakeDetailScreen;