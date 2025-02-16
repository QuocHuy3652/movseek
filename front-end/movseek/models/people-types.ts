interface MovieKnownFor {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: 'movie';
}

interface TVShowKnownFor {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  media_type: 'tv';
  adult: boolean;
  origin_country: string[];
}

type KnownFor = MovieKnownFor | TVShowKnownFor;

interface PeoplePopular {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownFor[];
}

interface PeoplePopularResults {
  page: number;
  results: PeoplePopular[];
  total_pages: number;
  total_results: number;
}

interface MovieCast {
  adult: boolean;
  backdrop_path: string | null;
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
  character: string;
  credit_id: string;
  order: number;
}

interface TVCast {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  episode_count: number;
}

interface MovieCrew {
  adult: boolean;
  backdrop_path: string | null;
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
  credit_id: string;
  department: string;
  job: string;
}

interface TVCrew {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  episode_count: number;
}

interface MovieCredits {
  cast: MovieCast[];
  crew: MovieCrew[];
  id: number;
}

interface TVCredits {
  cast: TVCast[];
  crew: TVCrew[];
  id: number;
}

type PeopleCredit = MovieCast | MovieCrew | TVCast | TVCrew;

interface PeopleDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  movie_credits: MovieCredits;
  tv_credits: TVCredits;
}

interface Credits {
  movie_credits: MovieCredits;
  tv_credits: TVCredits;
}

export type {
  PeoplePopularResults,
  MovieKnownFor,
  KnownFor,
  PeoplePopular,
  PeopleDetail,
  PeopleCredit,
  MovieCast,
  MovieCrew,
  MovieCredits,
  TVCredits,
  TVCast,
  TVCrew,
  Credits,
};
