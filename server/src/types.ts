export interface Movie {
    trakt_id: number;
    title: string;
    year: number;
    tmdb_id: number;
    overview?: string; // Movie description -> Optional
    runtime?: number; // In minutes -> Optional
    providers?: string[]; // Streaming providers-> Optional
  }