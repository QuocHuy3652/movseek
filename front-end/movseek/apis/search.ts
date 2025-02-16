import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const fetchSearchMovie = (query: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_MOVIE(query, page));
};

export const fetchSearchTV = (query: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_TV(query, page));
};

export const fetchSearchPerson = (query: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_PERSON(query, page));
};

export const fetchSearchSpecificMovie = (ids: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_SPECIFIC_MOVIE(ids, page));
};

export const fetchSearchSpecificTV = (ids: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_SPECIFIC_TV(ids, page));
};

export const fetchSearchSpecificPerson = (ids: string, page: number) => {
  return axiosInstance.get(TMDB_API.SEARCH_SPECIFIC_PERSON(ids, page));
};
