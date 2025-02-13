package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.NowPlayingMovies;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NowPlayingMoviesRepository extends MongoRepository<NowPlayingMovies, ObjectId> {
    @Nonnull
    Page<NowPlayingMovies> findAll(@Nonnull Pageable pageable);
}
