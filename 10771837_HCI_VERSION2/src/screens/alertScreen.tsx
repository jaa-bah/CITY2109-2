import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AlertScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Alerts</Text>
    <Text>Real-time alerts will appear here in future versions.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
}); 