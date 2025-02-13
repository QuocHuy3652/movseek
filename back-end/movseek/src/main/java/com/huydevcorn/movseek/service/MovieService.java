package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.model.movies.Movie;
import com.huydevcorn.movseek.repository.primary.MovieRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MovieService {
    MovieRepository movieRepository;

    public Optional<Movie> getMovieById(String id) {
        log.info("Fetching movie with id: {}", id);
        return movieRepository.findById(Integer.parseInt(id));
    }
}
