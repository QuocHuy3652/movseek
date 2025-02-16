import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const fetchMoviePopular = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.MOVIE_POPULAR(page, params));
};

export const fetchMovieTopRated = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.MOVIE_TOP_RATED(page, params));
};

export const fetchMovieNowPlaying = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.MOVIE_NOW_PLAYING(page, params));
};

export const fetchMovieUpcoming = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.MOVIE_UPCOMING(page, params));
};

export const fetchGenresMovie = () => {
  return axiosInstance.get(TMDB_API.GENRES_MOVIE());
};

export const fetchLatestTrailersMovie = () => {
  return axiosInstance.get(TMDB_API.MOVIE_LATEST_TRAILERS());
};
