import axiosInstance from '@/lib/axios.config';
import { TMDB_API } from '@/constants/constants';

export const addSavedItem = (media_id: number, media_type: string, saved_item_type: string, user_id: string) => {
  return axiosInstance.put(TMDB_API.ADD_SAVED_ITEM(), {
    media_id,
    media_type,
    saved_item_type,
    user_id,
  });
};

export const removeSavedItem = (media_id: number, media_type: string, saved_item_type: string, user_id: string) => {
  return axiosInstance.put(TMDB_API.REMOVE_SAVED_ITEM(), {
    media_id,
    media_type,
    saved_item_type,
    user_id,
  });
};

export const getFavoriteItem = (user_id: string) => {
  return axiosInstance.get(TMDB_API.GET_FAVORITE_ITEM(user_id));
};

export const getWatchlistItem = (user_id: string) => {
  return axiosInstance.get(TMDB_API.GET_WATCHLIST_ITEM(user_id));
};
