import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const fetchPeoplePopular = (page: number) => {
  return axiosInstance.get(TMDB_API.PEOPLE_POPULAR(page));
};

export const fetchPeopleDetail = (id: number) => {
  return axiosInstance.get(TMDB_API.PEOPLE_DETAIL(id));
};

export const fetchPeopleCredits = async (id: number) => {
  const movie_credits = await axiosInstance.get(TMDB_API.PEOPLE_MOVIE_CREDITS(id));
  const tv_credits = await axiosInstance.get(TMDB_API.PEOPLE_TV_CREDITS(id));
  return { movie_credits: movie_credits.data, tv_credits: tv_credits.data };
};
