// src/components/mapListView.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Earthquake } from '../types/navigation';

interface MapListViewProps {
  earthquakes: Earthquake[];
  onItemPress: (earthquakeId: string) => void;
}

const MapListView: React.FC<MapListViewProps> = ({ 
  earthquakes, 
  onItemPress 
}) => {
  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format magnitude with color
  const getMagnitudeClassification = (magnitude: number): string => {
    if (magnitude < 2.5) return 'Minor';
    if (magnitude < 4.0) return 'Light';
    if (magnitude < 5.0) return 'Moderate';
    if (magnitude < 6.0) return 'Strong';
    if (magnitude < 7.0) return 'Major';
    return 'Great';
  };

  // Sort earthquakes by date (most recent first)
  const sortedEarthquakes = [...earthquakes].sort((a, b) => 
    b.time.getTime() - a.time.getTime()
  );

  // Render earthquake item
  const renderItem = ({ item }: { item: Earthquake }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => onItemPress(item.id)}
    >
      <View style={[styles.magnitudeContainer, { backgroundColor: item.color }]}>
        <Text style={styles.magnitudeText}>{item.magnitude.toFixed(1)}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.locationText} numberOfLines={1}>
          {item.place}
        </Text>
        <Text style={styles.timeText}>
          {formatDate(item.time)} • {getMagnitudeClassification(item.magnitude)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={sortedEarthquakes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={true}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No earthquakes found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  magnitudeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  magnitudeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemDetails: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MapListView;