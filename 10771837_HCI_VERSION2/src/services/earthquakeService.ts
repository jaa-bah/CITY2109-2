import axios from 'axios';
import { Earthquake } from '../types/navigation';

// USGS Earthquake API base URL
const USGS_API_BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

// Helper to determine marker color based on magnitude
export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude < 2.5) return '#007AFF'; // Blue
  if (magnitude < 4.0) return '#34C759'; // Green
  if (magnitude < 5.0) return '#FFFF00'; // Yellow
  if (magnitude < 6.0) return '#FF9500'; // Orange
  if (magnitude < 7.0) return '#FF3B30'; // Red
  return '#DC143C'; // Crimson for 7.0+
};

// Interface for API response feature
interface USGSFeature {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    felt: number | null;
    alert: string | null;
    status: string;
    tsunami: number;
    type: string;
    title: string;
    detail?: string;
  };
  geometry: {
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
}

// Interface for API response
interface USGSResponse {
  features: USGSFeature[];
}

/**
 * Get earthquakes within the specified parameters
 * 
 * @param params Query parameters
 * @returns Array of earthquake data
 */
export const getEarthquakes = async (params: Record<string, any> = {}): Promise<Earthquake[]> => {
  try {
    // Default parameters
    const defaultParams = {
      format: 'geojson',
      starttime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      endtime: new Date().toISOString(),
      minmagnitude: 2.5,
      orderby: 'time',
      limit: 500,
    };

    // Merge default parameters with provided parameters
    const queryParams = {
      ...defaultParams,
      ...params,
    };

    // Make API request
    const response = await axios.get<USGSResponse>(USGS_API_BASE_URL, {
      params: queryParams,
    });

    // Process and transform data
    if (response.data && response.data.features) {
      return response.data.features.map((feature): Earthquake => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        time: new Date(feature.properties.time),
        url: feature.properties.url,
        felt: feature.properties.felt,
        alert: feature.properties.alert,
        status: feature.properties.status,
        tsunami: feature.properties.tsunami,
        type: feature.properties.type,
        title: feature.properties.title,
        depth: feature.geometry.coordinates[2],
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        color: getMagnitudeColor(feature.properties.mag),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw new Error('Failed to fetch earthquake data. Please check your internet connection and try again.');
  }
};

/**
 * Get earthquake details by ID
 * 
 * @param earthquakeId The USGS earthquake ID
 * @returns Detailed earthquake data
 */
export const getEarthquakeDetails = async (earthquakeId: string): Promise<Earthquake> => {
  try {
    const response = await axios.get<USGSResponse>(`${USGS_API_BASE_URL}?format=geojson&eventid=${earthquakeId}`);
    
    if (response.data && response.data.features && response.data.features.length > 0) {
      const feature = response.data.features[0];
      
      return {
        id: feature.id,
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        time: new Date(feature.properties.time),
        url: feature.properties.url,
        felt: feature.properties.felt,
        alert: feature.properties.alert,
        status: feature.properties.status,
        tsunami: feature.properties.tsunami,
        type: feature.properties.type,
        title: feature.properties.title,
        depth: feature.geometry.coordinates[2],
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        color: getMagnitudeColor(feature.properties.mag),
      };
    }
    
    throw new Error('Earthquake not found');
  } catch (error) {
    console.error('Error fetching earthquake details:', error);
    throw new Error('Failed to fetch earthquake details. Please check your internet connection and try again.');
  }
};
