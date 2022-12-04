export interface Movie {
  id?: number;
  title: string;
  year: number;
  tmdb_id: number;
  overview?: string; // Movie description
  runtime?: number; // In minutes
  genres?: string[]; // List of genres
  providers?: string[]; // Streaming providers
  backdrop_path?: string;
  poster_path?: string;
}

export interface Show {
  trakt_id?: number;
  title: string;
  year: number;
  tmdb_id: number;
  overview?: string; // Show description
  runtime?: number; // Average runtime, in minutes
  genres?: string[]; // List of genres
  providers?: string[]; // Streaming providers
  backdrop_path?: string;
  poster_path?: string;
}

// NOTE: Any changes here need to be changed in the server as well (src/types.ts)
