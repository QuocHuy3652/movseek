package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.response.MoviesListResponse;
import com.huydevcorn.movseek.dto.response.PeopleListResponse;
import com.huydevcorn.movseek.dto.response.TVListResponse;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.movies.Movie;
import com.huydevcorn.movseek.model.movies.MovieGenre;
import com.huydevcorn.movseek.model.people.People;
import com.huydevcorn.movseek.model.tvshows.TVShow;
import com.huydevcorn.movseek.repository.primary.MovieGenreRepository;
import com.huydevcorn.movseek.repository.primary.MovieRepository;
import com.huydevcorn.movseek.repository.secondary.PeopleRepository;
import com.huydevcorn.movseek.repository.secondary.TVShowRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SearchService {
    MovieGenreRepository movieGenreRepository;
    MovieRepository movieRepository;
    TVShowRepository tvShowRepository;
    PeopleRepository peopleRepository;

    public MoviesListResponse<Movie> searchMovies(
            String query,
            List<Long> ids,
            List<String> object_ids,
            List<String> genre_object_ids,
            int page,
            int per_page
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }

        Pageable pageable = PageRequest.of(page - 1, per_page);
        List<Movie> results;
        long totalResults;

        if (ids != null && !ids.isEmpty()) {
            totalResults = movieRepository.countByIdIn(ids).orElse(0L);
            results = movieRepository.findByIdIn(ids, pageable);
        }
        else if (object_ids != null && !object_ids.isEmpty()) {
            List<ObjectId> objectIdList = object_ids.stream().map(ObjectId::new).toList();
            totalResults = movieRepository.countBy_idIn(objectIdList).orElse(0L);
            results = movieRepository.findBy_idIn(objectIdList, pageable);
        }
        else if (genre_object_ids != null && !genre_object_ids.isEmpty()) {
            List<ObjectId> genreObjectIdList = genre_object_ids.stream().map(ObjectId::new).toList();
            List<MovieGenre> genres = movieGenreRepository.findBy_idIn(genreObjectIdList, pageable);
            if (genres.isEmpty()) {
                return MoviesListResponse.<Movie>builder()
                        .page(page)
                        .per_page(per_page)
                        .total_results(0)
                        .total_pages(0)
                        .results(Collections.emptyList())
                        .build();
            }
            List<Long> genreIds = genres.stream().map(MovieGenre::getId).toList();
            totalResults = movieRepository.countByGenresIdIn(genreIds).orElse(0L);
            results = movieRepository.findByGenresIdIn(genreIds, pageable);
        }
        else if (query != null && !query.isBlank()) {
            totalResults = movieRepository.countSearchMovies(query.trim()).orElse(0L);
            results = movieRepository.searchMovies(query.trim(), pageable);
        }
        else {
            return MoviesListResponse.<Movie>builder()
                    .page(page)
                    .per_page(per_page)
                    .total_results(0)
                    .total_pages(0)
                    .results(Collections.emptyList())
                    .build();
        }

        return MoviesListResponse.<Movie>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(results)
                .build();
    }


    public TVListResponse<TVShow> searchTVShows(String query, List<Long> ids, int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        List<TVShow> results;
        long totalResults;

        if (ids != null && !ids.isEmpty()) {
            totalResults = tvShowRepository.countByIdIn(ids).orElse(0L);
            results = tvShowRepository.findByIdIn(ids, pageable);
        }
        else if (query != null && !query.isBlank()) {
            totalResults = tvShowRepository.countSearchTVShows(query.trim()).orElse(0L);
            results = tvShowRepository.searchTVShows(query.trim(), pageable);
        }
        else {
            return TVListResponse.<TVShow>builder()
                    .page(page)
                    .per_page(per_page)
                    .total_results(0)
                    .total_pages(0)
                    .results(Collections.emptyList())
                    .build();
        }

        return TVListResponse.<TVShow>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(results)
                .build();
    }

    public PeopleListResponse<People> searchPeople(String query, List<Long> ids, int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        List<People> results;
        long totalResults;

        if (ids != null && !ids.isEmpty()) {
            totalResults = peopleRepository.countByIdIn(ids).orElse(0L);
            results = peopleRepository.findByIdIn(ids, pageable);
        }
        else if (query != null && !query.isBlank()) {
            totalResults = peopleRepository.countSearchPeople(query.trim()).orElse(0L);
            results = peopleRepository.searchPeople(query.trim(), pageable);
        }
        else {
            return PeopleListResponse.<People>builder()
                    .page(page)
                    .per_page(per_page)
                    .total_results(0)
                    .total_pages(0)
                    .results(Collections.emptyList())
                    .build();
        }

        return PeopleListResponse.<People>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(results)
                .build();
    }
}
