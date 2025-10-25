import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example API handlers for MSW
  http.get('/api/movies', () => {
    return HttpResponse.json([
      { id: 1, title: 'The Matrix', year: 1999, rating: 8.7 },
      { id: 2, title: 'Inception', year: 2010, rating: 8.8 },
      { id: 3, title: 'Interstellar', year: 2014, rating: 8.6 },
    ]);
  }),

  http.get('/api/movies/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      description: 'A computer hacker learns about the true nature of reality.',
    });
  }),
];

