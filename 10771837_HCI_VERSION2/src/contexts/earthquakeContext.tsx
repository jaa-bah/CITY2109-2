// src/contexts/earthquakeContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getEarthquakes } from '../services/earthquakeService';
import { 
  Earthquake, 
  EarthquakeContextType, 
  EarthquakeFilters, 
  Region 
} from '../types/navigation';

// Create context with default values
const EarthquakeContext = createContext<EarthquakeContextType>({
  earthquakes: [],
  loading: false,
  error: null,
  filters: {
    minMagnitude: 2.5,
    timeRange: 30,
    region: null,
  },
  updateFilters: () => {},
  refreshData: () => {},
});

// Custom hook to use the earthquake context
export const useEarthquakes = () => useContext(EarthquakeContext);

interface EarthquakeProviderProps {
  children: ReactNode;
}

export const EarthquakeProvider: React.FC<EarthquakeProviderProps> = ({ children }) => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EarthquakeFilters>({
    minMagnitude: 2.5,
    timeRange: 30, // days
    region: null, // null means global
  });

  // Load earthquakes based on current filters
  const loadEarthquakes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Calculate start time based on timeRange
      const endTime = new Date();
      const startTime = new Date();
      startTime.setDate(endTime.getDate() - filters.timeRange);

      // Prepare query parameters
      const queryParams: Record<string, any> = {
        starttime: startTime.toISOString(),
        endtime: endTime.toISOString(),
        minmagnitude: filters.minMagnitude,
      };

      // Add region filter if specified
      if (filters.region) {
        queryParams.latitude = filters.region.latitude;
        queryParams.longitude = filters.region.longitude;
        queryParams.maxradiuskm = filters.region.radius;
      }

      // Fetch earthquake data
      const earthquakeData = await getEarthquakes(queryParams);
      
      setEarthquakes(earthquakeData);
    } catch (err) {
      console.error('Failed to load earthquakes:', err);
      setError('Failed to load earthquake data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update filters and reload data
  const updateFilters = (newFilters: Partial<EarthquakeFilters>): void => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Load data when filters change
  useEffect(() => {
    loadEarthquakes();
  }, [filters]);

  // Provide context value
  const value: EarthquakeContextType = {
    earthquakes,
    loading,
    error,
    filters,
    updateFilters,
    refreshData: loadEarthquakes,
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
};