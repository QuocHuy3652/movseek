import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const fetchTVPopular = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.TV_POPULAR(page, params));
};

export const fetchTVTopRated = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.TV_TOP_RATED(page, params));
};

export const fetchTVOnTheAir = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.TV_ON_THE_AIR(page, params));
};

export const fetchTVAiringToday = (page: number, params: string) => {
  return axiosInstance.get(TMDB_API.TV_AIRING_TODAY(page, params));
};

export const fetchGenresTV = () => {
  return axiosInstance.get(TMDB_API.GENRES_TV());
};
