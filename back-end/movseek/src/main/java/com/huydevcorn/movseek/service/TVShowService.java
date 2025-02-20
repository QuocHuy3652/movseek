package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.response.GenreResponse;
import com.huydevcorn.movseek.dto.response.TVListResponse;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.tvshows.*;
import com.huydevcorn.movseek.repository.secondary.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public GenreResponse<TVGenre> getAllTVGenres() {
        return GenreResponse.<TVGenre>builder()
                .genres(tvGenreRepository.findAll())
                .build();
    }

    public TVListResponse<PopularTVShows> getPopularTVShows(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<PopularTVShows> popularTVShows = popularTVShowsRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return TVListResponse.<PopularTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) popularTVShows.getTotalElements())
                .total_pages(popularTVShows.getTotalPages())
                .results(popularTVShows.getContent())
                .build();
    }

    public TVListResponse<OnTheAirTVShows> getOnTheAirTVShows(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<OnTheAirTVShows> onTheAirTVShows = onTheAirTVShowsRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return TVListResponse.<OnTheAirTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) onTheAirTVShows.getTotalElements())
                .total_pages(onTheAirTVShows.getTotalPages())
                .results(onTheAirTVShows.getContent())
                .build();
    }

    public TVListResponse<TopRatedTVShows> getTopRatedTVShows(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<TopRatedTVShows> topRatedTVShows = topRatedTVShowsRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return TVListResponse.<TopRatedTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) topRatedTVShows.getTotalElements())
                .total_pages(topRatedTVShows.getTotalPages())
                .results(topRatedTVShows.getContent())
                .build();
    }

    public TVListResponse<AiringTodayTVShows> getAiringTodayTVShows(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<AiringTodayTVShows> airingTodayTVShows = airingTodayTVShowsRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return TVListResponse.<AiringTodayTVShows>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) airingTodayTVShows.getTotalElements())
                .total_pages(airingTodayTVShows.getTotalPages())
                .results(airingTodayTVShows.getContent())
                .build();
    }

}
