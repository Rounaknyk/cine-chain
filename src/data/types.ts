// Type definitions for the application

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  description?: string;
  genre?: string[];
  director?: string;
  cast?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteGenres: string[];
  notificationSettings: {
    email: boolean;
    push: boolean;
  };
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface MapLocation {
  id: number;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'cinema' | 'theater' | 'event';
}

