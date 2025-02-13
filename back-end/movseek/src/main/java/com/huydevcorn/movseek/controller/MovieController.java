package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.model.movies.Movie;
import com.huydevcorn.movseek.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
