import { ChartData, MapLocation, Movie } from './types';

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: 'The Matrix',
    year: 1999,
    rating: 8.7,
    description: 'A computer hacker learns about the true nature of reality.',
    genre: ['Action', 'Sci-Fi'],
    director: 'Lana Wachowski, Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    rating: 8.8,
    description: 'A thief who steals corporate secrets through dream-sharing technology.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
  },
  {
    id: 3,
    title: 'Interstellar',
    year: 2014,
    rating: 8.6,
    description: 'A team of explorers travel through a wormhole in space.',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  },
];

export const sampleChartData: ChartData[] = [
  { name: 'Action', value: 45, color: '#3b82f6' },
  { name: 'Comedy', value: 30, color: '#10b981' },
  { name: 'Drama', value: 25, color: '#f59e0b' },
  { name: 'Sci-Fi', value: 20, color: '#ef4444' },
];

export const sampleMapLocations: MapLocation[] = [
  {
    id: 1,
    name: 'AMC Times Square',
    coordinates: [-74.006, 40.758],
    type: 'cinema',
  },
  {
    id: 2,
    name: 'Regal Union Square',
    coordinates: [-73.991, 40.736],
    type: 'cinema',
  },
  {
    id: 3,
    name: 'Lincoln Center',
    coordinates: [-73.985, 40.773],
    type: 'theater',
  },
];


