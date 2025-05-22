// src/types/navigation.ts

// Define all the routes and their parameter types
export type RootStackParamList = {
    // Main tabs
    MainTabs: undefined;
    Map: undefined;
    MapMain: undefined;
    Report: undefined;
    Chats: undefined;
    Profile: undefined;
    
    // Detail screens
    EarthquakeDetail: { earthquakeId: string };
    
    // Settings screens
    Settings: undefined;
    AlertSettings: undefined;
    SafetySettings: undefined;
    DisplaySettings: undefined;
    ThemeSettings: undefined;
    DataSettings: undefined;
    LanguageSettings: undefined;
    PrivacySettings: undefined;
    Home: undefined;
    Alerts: undefined;
  };
  
  // Define earthquake data type
  export interface Earthquake {
    id: string;
    magnitude: number;
    place: string;
    time: Date;
    url: string;
    felt: number | null;
    alert: string | null;
    status: string;
    tsunami: number;
    type: string;
    title: string;
    depth: number;
    longitude: number;
    latitude: number;
    color: string;
  }
  
  // Define earthquake context types
  export interface EarthquakeContextType {
    earthquakes: Earthquake[];
    loading: boolean;
    error: string | null;
    filters: EarthquakeFilters;
    updateFilters: (newFilters: Partial<EarthquakeFilters>) => void;
    refreshData: () => void;
  }
  
  export interface EarthquakeFilters {
    minMagnitude: number;
    timeRange: number; // days
    region: Region | null;
  }
  
  export interface Region {
    latitude: number;
    longitude: number;
    radius: number; // km
  }
  
  // Define globe view props
  export interface GlobeViewProps {
    earthquakes: Earthquake[];
    is3D: boolean;
    onMarkerPress: (earthquakeId: string) => void;
  }
  
  // Define filter modal props
  export interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
  }