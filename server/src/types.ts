export interface Movie {
  trakt_id: number;
  title: string;
  year: number;
  tmdb_id: number;
  overview?: string; // Movie description -> Optional
  runtime?: number; // In minutes -> Optional
  providers?: string[]; // Streaming providers-> Optional
  backdrop_path?: string; // Optional
  poster_path?: string; // Optional
}

export interface Show {
  trakt_id?: number;
  title: string;
  year: number;
  tmdb_id: number;
  overview?: string; // Show description
  runtime?: number; // In minutes
  genres?: string[]; // List of genres
  providers?: string[]; // Streaming providers
  backdrop_path?: string;
  poster_path?: string;
}

// NOTE: Any changes here need to be changed in the client as well (src/types.ts)
