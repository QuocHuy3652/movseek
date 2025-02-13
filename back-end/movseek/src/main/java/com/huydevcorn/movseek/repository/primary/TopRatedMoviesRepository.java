package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.TopRatedMovies;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TopRatedMoviesRepository extends MongoRepository<TopRatedMovies, ObjectId> {
    @Nonnull
    Page<TopRatedMovies> findAll(@Nonnull Pageable pageable);
}
