package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.TrendingWeekMovies;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrendingWeekMoviesRepository extends MongoRepository<TrendingWeekMovies, ObjectId> {
    @Nonnull
    Page<TrendingWeekMovies> findAll(@Nonnull Pageable pageable);
}
