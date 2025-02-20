interface Movie {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: (Movie | TV)[];
}

interface SearchMovieResults {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface SearchTVResults {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}

interface SearchPersonResults {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

export type { Movie, SearchMovieResults, SearchTVResults, SearchPersonResults, Person, TV };
