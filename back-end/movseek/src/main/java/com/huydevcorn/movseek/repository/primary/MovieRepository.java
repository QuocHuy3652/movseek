package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
    @Query("{ 'id' : ?0 }")
    Optional<Movie> findById(int id);
}
