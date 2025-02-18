package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.request.SavedItemRequest;
import com.huydevcorn.movseek.dto.response.Favorite;
import com.huydevcorn.movseek.dto.response.SavedItemResponse;
import com.huydevcorn.movseek.dto.response.Watchlist;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.profile.SavedItem;
import com.huydevcorn.movseek.repository.secondary.SavedItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SavedItemService {
    SavedItemRepository savedItemRepository;

    public SavedItemResponse getSavedItemByUser_id(String user_id, String type) {
        if (!type.equals("watchlist") && !type.equals("favorite")) {
            throw new AppException(ErrorCode.INVALID_TYPE_SAVED_ITEM);
        }
        Optional<SavedItem> saveItem = savedItemRepository.findSavedItemByUser_id(user_id);
        if (saveItem.isPresent()) {
            if (type.equals("watchlist")) {
                return SavedItemResponse.builder()
                        .user_id(user_id)
                        .type(type)
                        .movie_id(saveItem.get().getWatchlist().getMovie_id())
                        .tv_show_id(saveItem.get().getWatchlist().getTv_show_id())
                        .build();
            } else {
                return SavedItemResponse.builder()
                        .user_id(user_id)
                        .type(type)
                        .movie_id(saveItem.get().getFavorite().getMovie_id())
                        .tv_show_id(saveItem.get().getFavorite().getTv_show_id())
                        .build();
            }
        } else {
            return SavedItemResponse.builder()
                    .user_id(user_id)
                    .type(type)
                    .movie_id(Collections.emptySet())
                    .tv_show_id(Collections.emptySet())
                    .build();
        }
    }

    public void addSavedItem(SavedItemRequest request) {
        String user_id = request.getUser_id();
        long media_id = request.getMedia_id();
        String media_type = request.getMedia_type();
        String saved_item_type = request.getSaved_item_type();

        if (!saved_item_type.equals("watchlist") && !saved_item_type.equals("favorite")) {
            throw new AppException(ErrorCode.INVALID_TYPE_SAVED_ITEM);
        }
        if (!media_type.equals("movie") && !media_type.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }
        SavedItem savedItem = savedItemRepository.findSavedItemByUser_id(user_id)
                .orElseGet(() -> SavedItem.builder()
                        .user_id(user_id)
                        .watchlist(new Watchlist(new HashSet<>(), new HashSet<>()))
                        .favorite(new Favorite(new HashSet<>(), new HashSet<>()))
                        .build());

        if (saved_item_type.equals("watchlist")) {
            if (media_type.equals("movie")) {
                savedItem.getWatchlist().getMovie_id().add(media_id);
            } else {
                savedItem.getWatchlist().getTv_show_id().add(media_id);
            }
        } else {
            if (media_type.equals("movie")) {
                savedItem.getFavorite().getMovie_id().add(media_id);
            } else {
                savedItem.getFavorite().getTv_show_id().add(media_id);
            }
        }

        savedItemRepository.save(savedItem);
    }

    public void removeSavedItem(SavedItemRequest request) {
        String user_id = request.getUser_id();
        long media_id = request.getMedia_id();
        String media_type = request.getMedia_type();
        String saved_item_type = request.getSaved_item_type();

        if (!saved_item_type.equals("watchlist") && !saved_item_type.equals("favorite")) {
            throw new AppException(ErrorCode.INVALID_TYPE_SAVED_ITEM);
        }
        if (!media_type.equals("movie") && !media_type.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }
        Optional<SavedItem> saveItemOpt = savedItemRepository.findSavedItemByUser_id(user_id);
        if (saveItemOpt.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        SavedItem saveItem = saveItemOpt.get();
        boolean removed;

        if (saved_item_type.equals("watchlist")) {
            removed = media_type.equals("movie")
                    ? saveItem.getWatchlist().getMovie_id().remove(media_id)
                    : saveItem.getWatchlist().getTv_show_id().remove(media_id);
        } else {
            removed = media_type.equals("movie")
                    ? saveItem.getFavorite().getMovie_id().remove(media_id)
                    : saveItem.getFavorite().getTv_show_id().remove(media_id);
        }

        if (!removed) {
            throw new AppException(ErrorCode.MEDIA_NOT_FOUND);
        }

        savedItemRepository.save(saveItem);
    }
}
