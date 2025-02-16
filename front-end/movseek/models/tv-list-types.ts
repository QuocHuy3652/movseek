interface TVPopular {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

type TVList = TVPopular;

interface TVListResults {
  page: number;
  results: TVList[];
  total_pages: number;
  total_results: number;
}

interface GenresTV {
  id: number;
  name: string;
}

interface GenresTVResults {
  genres: GenresTV[];
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
  runTime: {
    from: number;
    to: number;
  };
}

export type { TVPopular, TVList, TVListResults, GenresTV, GenresTVResults, FilterSortState };
