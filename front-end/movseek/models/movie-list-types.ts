interface MoviePopular {
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

type MovieList = MoviePopular;

interface MovieListResults {
  page: number;
  results: MovieList[];
  total_pages: number;
  total_results: number;
}

interface GenresMovie {
  id: number;
  name: string;
}

interface GenresMovieResults {
  genres: GenresMovie[];
}

interface FilterSortState {
  sort: string;
  genre: number[];
  releaseDate: {
    from: Date | null;
    to: Date | null;
  };
  userScore: {
    from: number;
    to: number;
  };
}

export type { MoviePopular, MovieList, MovieListResults, GenresMovie, GenresMovieResults, FilterSortState };
