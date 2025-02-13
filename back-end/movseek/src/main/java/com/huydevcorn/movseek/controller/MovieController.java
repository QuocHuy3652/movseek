package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.model.movies.Movie;
import com.huydevcorn.movseek.service.MovieService;
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
public class MovieController {
    MovieService movieService;

    @GetMapping("/{id}")
    public Optional<Movie> getMovies(@PathVariable String id) {
        return movieService.getMovieById(id);
    }
}
