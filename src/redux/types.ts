export interface MovieType {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetailType {
  Actors: string[];
  Awards: string[];
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface MovieState {
  loading: boolean;
  title: string;
  movies: MovieType[];
  error: string | null;
  page: number;
  totalPages: number;
  imdbId: string;
  favoriteMovies: MovieType[];
}

export interface MovieDetailState {
  loading: boolean;
  error: string | null;
  movieDetail: MovieDetailType;
  imdbId: string;
}
