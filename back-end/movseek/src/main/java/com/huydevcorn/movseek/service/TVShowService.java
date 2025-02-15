package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.response.TVListResponse;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.tvshows.*;
import com.huydevcorn.movseek.repository.secondary.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TVShowService {
    TVGenreRepository tvGenreRepository;
    TVShowRepository tvShowRepository;
    PopularTVShowsRepository popularTVShowsRepository;
    TopRatedTVShowsRepository topRatedTVShowsRepository;
    OnTheAirTVShowsRepository onTheAirTVShowsRepository;
    AiringTodayTVShowsRepository airingTodayTVShowsRepository;

    public Optional<TVShow> getTVShowById(String id) {
        Optional<TVShow> tvShow = tvShowRepository.findById(Integer.parseInt(id));
        if (tvShow.isPresent()) {
            return tvShow;
        } else {
            throw new AppException(ErrorCode.TV_SHOW_NOT_FOUND);
        }
    }

    public List<TVGenre> getAllTVGenres() {
        return tvGenreRepository.findAll();
    }

    public TVListResponse<PopularTVShows> getPopularTVShows(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        long totalResults = popularTVShowsRepository.count();
        return TVListResponse.<PopularTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(popularTVShowsRepository.findAll(pageable).getContent())
                .build();
    }

    public TVListResponse<OnTheAirTVShows> getOnTheAirTVShows(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        long totalResults = onTheAirTVShowsRepository.count();
        return TVListResponse.<OnTheAirTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(onTheAirTVShowsRepository.findAll(pageable).getContent())
                .build();
    }

    public TVListResponse<TopRatedTVShows> getTopRatedTVShows(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        long totalResults = topRatedTVShowsRepository.count();
        return TVListResponse.<TopRatedTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(topRatedTVShowsRepository.findAll(pageable).getContent())
                .build();
    }

    public TVListResponse<AiringTodayTVShows> getAiringTodayTVShows(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        long totalResults = airingTodayTVShowsRepository.count();
        return TVListResponse.<AiringTodayTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(airingTodayTVShowsRepository.findAll(pageable).getContent())
                .build();
    }

}
