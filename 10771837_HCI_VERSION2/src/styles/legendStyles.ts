// src/styles/legendStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  legendContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '16%',
    marginBottom: 10,
  },
  legendMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});