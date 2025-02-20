package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.dto.response.GenreResponse;
import com.huydevcorn.movseek.dto.response.TVListResponse;
import com.huydevcorn.movseek.model.tvshows.*;
import com.huydevcorn.movseek.service.TVShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/tvshow")
@Tag(name = "TV Show", description = "TV Show API")
public class TVShowController {
    TVShowService tvShowService;

    @GetMapping("/{id}")
    @Operation(summary = "Get tv show by id")
    public ApiResponse<Optional<TVShow>> getTVShowById(@PathVariable String id) {
        return ApiResponse.<Optional<TVShow>>builder()
                .data(tvShowService.getTVShowById(id))
                .build();
    }

    @GetMapping("/genres")
    @Operation(summary = "Get all tv genres")
    public ApiResponse<GenreResponse<TVGenre>> getAllTVGenres() {
        return ApiResponse.<GenreResponse<TVGenre>>builder()
                .data(tvShowService.getAllTVGenres())
                .build();
    }

    @GetMapping("/popular")
    @Operation(summary = "Get popular tv shows")
    public ApiResponse<TVListResponse<PopularTVShows>> getPopularTVShows(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start_date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end_date,
            @RequestParam(required = false) Double start_average_vote,
            @RequestParam(required = false) Double end_average_vote,
            @RequestParam(required = false) List<Integer> genre_ids,
            @RequestParam(required = false) Integer time_order,
            @RequestParam(required = false) Integer popularity_order,
            @RequestParam(required = false) Integer vote_order,
            @RequestParam(required = false) Integer title_order
    ) {
        return ApiResponse.<TVListResponse<PopularTVShows>>builder()
                .data(tvShowService.getPopularTVShows(page, per_page, start_date, end_date, start_average_vote,
                        end_average_vote, genre_ids, time_order, popularity_order, vote_order, title_order))
                .build();
    }

    @GetMapping("/on-the-air")
    @Operation(summary = "Get on the air tv shows")
    public ApiResponse<TVListResponse<OnTheAirTVShows>> getOnTheAirTVShows(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start_date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end_date,
            @RequestParam(required = false) Double start_average_vote,
            @RequestParam(required = false) Double end_average_vote,
            @RequestParam(required = false) List<Integer> genre_ids,
            @RequestParam(required = false) Integer time_order,
            @RequestParam(required = false) Integer popularity_order,
            @RequestParam(required = false) Integer vote_order,
            @RequestParam(required = false) Integer title_order
    ) {
        return ApiResponse.<TVListResponse<OnTheAirTVShows>>builder()
                .data(tvShowService.getOnTheAirTVShows(page, per_page, start_date, end_date, start_average_vote,
                        end_average_vote, genre_ids, time_order, popularity_order, vote_order, title_order))
                .build();
    }

    @GetMapping("/airing-today")
    @Operation(summary = "Get airing today tv shows")
    public ApiResponse<TVListResponse<AiringTodayTVShows>> getAiringTodayTVShows(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start_date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end_date,
            @RequestParam(required = false) Double start_average_vote,
            @RequestParam(required = false) Double end_average_vote,
            @RequestParam(required = false) List<Integer> genre_ids,
            @RequestParam(required = false) Integer time_order,
            @RequestParam(required = false) Integer popularity_order,
            @RequestParam(required = false) Integer vote_order,
            @RequestParam(required = false) Integer title_order
    ) {
        return ApiResponse.<TVListResponse<AiringTodayTVShows>>builder()
                .data(tvShowService.getAiringTodayTVShows(page, per_page, start_date, end_date, start_average_vote,
                        end_average_vote, genre_ids, time_order, popularity_order, vote_order, title_order))
                .build();
    }

    @GetMapping("/top-rated")
    @Operation(summary = "Get top rated tv shows")
    public ApiResponse<TVListResponse<TopRatedTVShows>> getTopRatedTVShows(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start_date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end_date,
            @RequestParam(required = false) Double start_average_vote,
            @RequestParam(required = false) Double end_average_vote,
            @RequestParam(required = false) List<Integer> genre_ids,
            @RequestParam(required = false) Integer time_order,
            @RequestParam(required = false) Integer popularity_order,
            @RequestParam(required = false) Integer vote_order,
            @RequestParam(required = false) Integer title_order
    ) {
        return ApiResponse.<TVListResponse<TopRatedTVShows>>builder()
                .data(tvShowService.getTopRatedTVShows(page, per_page, start_date, end_date, start_average_vote,
                        end_average_vote, genre_ids, time_order, popularity_order, vote_order, title_order))
                .build();
    }
}
