package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.response.*;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.movies.*;
import com.huydevcorn.movseek.repository.primary.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MovieService {
    MovieRepository movieRepository;
    MovieGenreRepository movieGenreRepository;
    PopularMoviesRepository popularMoviesRepository;
    UpcomingMoviesRepository upcomingMoviesRepository;
    NowPlayingMoviesRepository nowPlayingMoviesRepository;
    TopRatedMoviesRepository topRatedMoviesRepository;
    TrendingDayMoviesRepository trendingDayMoviesRepository;
    TrendingWeekMoviesRepository trendingWeekMoviesRepository;


    public Optional<Movie> getMovieById(String id) {
        Optional<Movie> movie = movieRepository.findById(Integer.parseInt(id));
        if (movie.isPresent()) {
            return movie;
        } else {
            throw new AppException(ErrorCode.MOVIE_NOT_FOUND);
        }
    }

    public List<TrailerResponse> getMovieTrailers(String id) {
        Optional<Movie> movie = movieRepository.findById(Integer.parseInt(id));
        if (movie.isPresent()) {
            return movie.map(Movie::getTrailers).orElse(null);
        } else {
            throw new AppException(ErrorCode.MOVIE_NOT_FOUND);
        }
    }

    public List<KeywordResponse> getMovieKeywords(String id) {
        Optional<Movie> movie = movieRepository.findById(Integer.parseInt(id));
        if (movie.isPresent()) {
            return movie.map(Movie::getKeywords).orElse(null);
        } else {
            throw new AppException(ErrorCode.MOVIE_NOT_FOUND);
        }
    }

    public CreditResponse getMovieCredits(String id) {
        Optional<Movie> movie = movieRepository.findById(Integer.parseInt(id));
        if (movie.isPresent()) {
            return movie.map(Movie::getCredits).orElse(null);
        } else {
            throw new AppException(ErrorCode.MOVIE_NOT_FOUND);
        }
    }

    public GenreResponse<MovieGenre> getAllMovieGenres() {
        return GenreResponse.<MovieGenre>builder()
                .genres(movieGenreRepository.findAll())
                .build();
    }

    public MoviesListResponse<PopularMovies> getPopularMovies(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<PopularMovies> movies = popularMoviesRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return MoviesListResponse.<PopularMovies>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) movies.getTotalElements())
                .total_pages(movies.getTotalPages())
                .results(movies.getContent())
                .build();
    }

    public MoviesListResponse<UpcomingMovies> getUpcomingMovies(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<UpcomingMovies> movies = upcomingMoviesRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return MoviesListResponse.<UpcomingMovies>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) movies.getTotalElements())
                .total_pages(movies.getTotalPages())
                .results(movies.getContent())
                .build();
    }

    public MoviesListResponse<TopRatedMovies> getTopRatedMovies(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<TopRatedMovies> movies = topRatedMoviesRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return MoviesListResponse.<TopRatedMovies>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) movies.getTotalElements())
                .total_pages(movies.getTotalPages())
                .results(movies.getContent())
                .build();
    }

    public MoviesListResponse<NowPlayingMovies> getNowPlayingMovies(
            int page, int per_page, LocalDate startDate, LocalDate endDate, Double startVote, Double endVote,
            List<Integer> genreIds, Integer timeOrder, Integer popularityOrder, Integer voteOrder, Integer titleOrder
    ) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);

        Page<NowPlayingMovies> movies = nowPlayingMoviesRepository.filterEntity(
                startDate, endDate, startVote, endVote, genreIds, timeOrder,
                popularityOrder, voteOrder, titleOrder, pageable);

        return MoviesListResponse.<NowPlayingMovies>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) movies.getTotalElements())
                .total_pages(movies.getTotalPages())
                .results(movies.getContent())
                .build();
    }

    public MoviesListResponse<?> getTrendingMovies(String type, int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        if (type.equals("day")) {
            long totalResults = trendingDayMoviesRepository.count();
            return MoviesListResponse.<TrendingDayMovies>builder()
                    .page(page)
                    .per_page(per_page)
                    .total_results((int) totalResults)
                    .total_pages((int) Math.ceil((double) totalResults / per_page))
                    .results(trendingDayMoviesRepository.findAll(pageable).getContent())
                    .build();
        } else if (type.equals("week")) {
            long totalResults = trendingWeekMoviesRepository.count();
            return MoviesListResponse.<TrendingWeekMovies>builder()
                    .page(page)
                    .per_page(per_page)
                    .total_results((int) totalResults)
                    .total_pages((int) Math.ceil((double) totalResults / per_page))
                    .results(trendingWeekMoviesRepository.findAll(pageable).getContent())
                    .build();
        } else {
            throw new AppException(ErrorCode.INVALID_TYPE_TRENDING_MOVIE);
        }
    }

    public List<LatestTrailersResponse> getLatestMovieTrailers(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        List<Movie> movies = movieRepository.findLatestMoviesTrailers(pageable);
        return movies.stream().map(movie -> {
                    TrailerResponse latestTrailer = movie.getTrailers().stream()
                            .max(Comparator.comparing(TrailerResponse::getPublished_at))
                            .orElse(null);

                    if (latestTrailer == null) return null;

                    return LatestTrailersResponse.builder()
                            .trailer(latestTrailer)
                            .title(movie.getTitle())
                            .backdrop_path(movie.getBackdrop_path())
                            .poster_path(movie.getPoster_path())
                            .id(movie.getId())
                            .build();
                }).filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

}
