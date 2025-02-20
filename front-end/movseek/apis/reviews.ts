import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const addComment = (
  avatar: string,
  comment: string,
  media_id: number,
  type: 'movie' | 'tv_show',
  user_id: string,
  username: string,
) => {
  return axiosInstance.post(TMDB_API.ADD_REVIEW(), {
    avatar,
    comment,
    media_id,
    type,
    user_id,
    username,
  });
};

export const getCommentsByMedia = (media_id: number, type: 'movie' | 'tv_show') => {
  return axiosInstance.get(TMDB_API.GET_REVIEWS_BY_MEDIA(media_id, type));
};

export const getCommentsByUser = (user_id: string) => {
  return axiosInstance.get(TMDB_API.GET_REVIEWS_BY_USER(user_id));
};

export const updateComment = (
  avatar: string,
  comment: string,
  media_id: number,
  type: 'movie' | 'tv_show',
  user_id: string,
  username: string,
) => {
  return axiosInstance.put(TMDB_API.UPDATE_REVIEWS(user_id), {
    avatar,
    comment,
    media_id,
    type,
    user_id,
    username,
  });
};

export const deleteComment = (user_id: string, media_id: number, type: 'movie' | 'tv_show') => {
  return axiosInstance.delete(TMDB_API.DELETE_REVIEWS(user_id, media_id, type));
};
