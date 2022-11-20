export interface Movie {
    id: number;
    title: string;
    year: number;
    tmdb_id: number;
    overview: string; // Movie description
    runtime: number; // In minutes
  }