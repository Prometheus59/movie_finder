export default interface Movie {
    id: number;
    title: string;
    year: number;
    tmdb_id: number;
    overview: string; // Movie description
    runtime: number; // In minutes
    providers: string[]; // Streaming providers
  }