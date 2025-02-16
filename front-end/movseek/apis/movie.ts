import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const fetchMovieDetail = (id: number) => {
  return axiosInstance.get(TMDB_API.MOVIE_DETAILS(id));
};

export const fetchMovieCredits = (id: number) => {
  return axiosInstance.get(TMDB_API.MOVIE_CREDITS(id));
};

export const fetchMovieKeywords = (id: number) => {
  return axiosInstance.get(TMDB_API.MOVIE_KEYWORDS(id));
};

export const fetchMovieVideos = (id: number) => {
  return axiosInstance.get(TMDB_API.MOVIE_VIDEOS(id));
};
