package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.UpcomingMovies;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UpcomingMoviesRepository extends MongoRepository<UpcomingMovies, ObjectId> {
    @Nonnull
    Page<UpcomingMovies> findAll(@Nonnull Pageable pageable);
}
