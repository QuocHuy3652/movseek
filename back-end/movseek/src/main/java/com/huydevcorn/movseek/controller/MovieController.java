package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.response.*;
import com.huydevcorn.movseek.model.movies.*;
import com.huydevcorn.movseek.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/movie")
@Tag(name = "Movie", description = "Movie API")
public class MovieController {
    MovieService movieService;

    @GetMapping("/{id}")
    @Operation(summary = "Get movie by id")
    public ApiResponse<Optional<Movie>> getMovieById(@PathVariable String id) {
        return ApiResponse.<Optional<Movie>>builder()
                .data(movieService.getMovieById(id))
                .build();
    }

    @GetMapping("/{id}/videos")
    @Operation(summary = "Get movie trailers by id")
    public ApiResponse<List<TrailerResponse>> getMovieTrailers(@PathVariable String id) {
        return ApiResponse.<List<TrailerResponse>>builder()
                .data(movieService.getMovieTrailers(id))
                .build();
    }

    @GetMapping("/{id}/keywords")
    @Operation(summary = "Get movie keywords by id")
    public ApiResponse<List<KeywordResponse>> getMovieKeywords(@PathVariable String id) {
        return ApiResponse.<List<KeywordResponse>>builder()
                .data(movieService.getMovieKeywords(id))
                .build();
    }

    @GetMapping("/{id}/credits")
    @Operation(summary = "Get movie credits by id")
    public ApiResponse<CreditResponse> getMovieCredits(@PathVariable String id) {
        return ApiResponse.<CreditResponse>builder()
                .data(movieService.getMovieCredits(id))
                .build();
    }

    @GetMapping("/genres")
    @Operation(summary = "Get all movie genres")
    public ApiResponse<List<Genre>> getAllMovieGenres() {
        return ApiResponse.<List<Genre>>builder()
                .data(movieService.getAllMovieGenres())
                .build();
    }

    @GetMapping("/popular")
    @Operation(summary = "Get popular movies")
    public ApiResponse<MoviesListResponse<PopularMovies>> getPopularMovies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<PopularMovies>>builder()
                .data(movieService.getPopularMovies(page, per_page))
                .build();
    }

    @GetMapping("/upcoming")
    @Operation(summary = "Get upcoming movies")
    public ApiResponse<MoviesListResponse<UpcomingMovies>> getUpcomingMovies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<UpcomingMovies>>builder()
                .data(movieService.getUpcomingMovies(page, per_page))
                .build();
    }

    @GetMapping("/now-playing")
    @Operation(summary = "Get now playing movies")
    public ApiResponse<MoviesListResponse<NowPlayingMovies>> getNowPlayingMovies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<NowPlayingMovies>>builder()
                .data(movieService.getNowPlayingMovies(page, per_page))
                .build();
    }

    @GetMapping("/top-rated")
    @Operation(summary = "Get top rated movies")
    public ApiResponse<MoviesListResponse<TopRatedMovies>> getTopRatedMovies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<TopRatedMovies>>builder()
                .data(movieService.getTopRatedMovies(page, per_page))
                .build();
    }

    @GetMapping("/trending/{type}")
    @Operation(summary = "Get trending movies by type")
    public ApiResponse<MoviesListResponse<?>> getPopularMovies(
            @PathVariable String type,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<?>>builder()
                .data(movieService.getTrendingMovies(type, page, per_page))
                .build();
    }

    @GetMapping("/trailer/latest")
    @Operation(summary = "Get latest movie trailers")
    public ApiResponse<List<LatestTrailersResponse>> getLatestMoviesTrailers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<List<LatestTrailersResponse>>builder()
                .data(movieService.getLatestMovieTrailers(page, per_page))
                .build();
    }


}
