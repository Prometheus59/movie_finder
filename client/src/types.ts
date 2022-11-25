export default interface Movie {
  id?: number;
  title: string;
  year: number;
  tmdb_id: number;
  overview?: string; // Movie description
  runtime?: number; // In minutes
  genres?: string[]; // List of genres
  providers?: string[]; // Streaming providers
  backdrop_path?: string;
}
