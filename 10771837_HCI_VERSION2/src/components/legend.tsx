// src/components/legend.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/legendStyles';

interface LegendItem {
  color: string;
  label: string;
  description?: string;
}

const Legend: React.FC = () => {
  const legendItems: LegendItem[] = [
    { color: '#007AFF', label: 'Blue', description: 'Minor (< 2.5)' },
    { color: '#34C759', label: 'Green', description: 'Light (2.5-4.0)' },
    { color: '#FFFF00', label: 'Yellow', description: 'Moderate (4.0-5.0)' },
    { color: '#FF9500', label: 'Orange', description: 'Strong (5.0-6.0)' },
    { color: '#FF3B30', label: 'Red', description: 'Major (6.0-7.0)' },
    { color: '#DC143C', label: 'Crimson', description: 'Great (7.0+)' },
  ];

  return (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>Legend</Text>
      <View style={styles.legendItems}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendMarker, { backgroundColor: item.color }]}>
              <Ionicons name="location" size={12} color="white" />
            </View>
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Legend;