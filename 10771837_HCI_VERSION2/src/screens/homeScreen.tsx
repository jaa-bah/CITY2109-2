import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getEarthquakes } from '../services/earthquakeService';
import { styles } from '../styles/homeScreenStyles';
import { Earthquake, RootStackParamList } from '../types/navigation';
import { formatRelativeTime, getMagnitudeDescription } from '../utils/earthquakeUtils';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [skeletonOpacity] = useState(new Animated.Value(0.3));

  // Animate skeleton loading
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonOpacity, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonOpacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [loading, skeletonOpacity]);

  const fetchData = async () => {
    try {
      setError(null);
      const data = await getEarthquakes();
      setEarthquakes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch earthquake data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleEarthquakePress = (earthquake: Earthquake) => {
    navigation.navigate('EarthquakeDetail', { earthquakeId: earthquake.id });
  };

  const renderSkeletonItem = () => (
    <Animated.View style={[styles.earthquakeItem, { opacity: skeletonOpacity }]}>
      <View style={[styles.magnitudeIndicator, { backgroundColor: '#E0E0E0' }]} />
      <View style={styles.earthquakeInfo}>
        <View style={[styles.skeletonText, { width: '80%' }]} />
        <View style={[styles.skeletonText, { width: '60%' }]} />
        <View style={[styles.skeletonText, { width: '40%' }]} />
      </View>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={renderSkeletonItem}
          keyExtractor={(_, index) => `skeleton-${index}`}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Earthquake }) => (
    <TouchableOpacity 
      style={styles.earthquakeItem}
      onPress={() => handleEarthquakePress(item)}
    >
      <View style={[styles.magnitudeIndicator, { backgroundColor: item.color }]}>
        <Text style={styles.magnitudeText}>{item.magnitude.toFixed(1)}</Text>
      </View>
      <View style={styles.earthquakeInfo}>
        <Text style={styles.earthquakeTitle}>{item.title}</Text>
        <Text style={styles.earthquakeLocation}>{item.place}</Text>
        <View style={styles.earthquakeDetails}>
          <Text style={styles.earthquakeTime}>{formatRelativeTime(item.time)}</Text>
          <Text style={styles.magnitudeDescription}>
            {getMagnitudeDescription(item.magnitude)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={earthquakes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}; 