export interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    alert: string | null;
    tsunami: number;
    depth: number;
  };
  geometry: {
    coordinates: number[];
  };
} 