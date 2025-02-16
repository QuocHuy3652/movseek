import axiosInstance from '@/lib/axios.config';
import axiosInstanceTMDB from '@/lib/axios.config.tmdb';
import { TMDB_API } from '@/constants/constants';

export const fetchTVDetail = (id: number) => {
  return axiosInstance.get(TMDB_API.TV_DETAILS(id));
};

export const fetchTVCredits = (id: number) => {
  return axiosInstanceTMDB.get(TMDB_API.TV_CREDITS_TMDB(id));
};

export const fetchTVKeywords = (id: number) => {
  return axiosInstanceTMDB.get(TMDB_API.TV_KEYWORDS_TMDB(id));
};

export const fetchTVVideos = (id: number) => {
  return axiosInstanceTMDB.get(TMDB_API.TV_VIDEOS_TMDB(id));
};
