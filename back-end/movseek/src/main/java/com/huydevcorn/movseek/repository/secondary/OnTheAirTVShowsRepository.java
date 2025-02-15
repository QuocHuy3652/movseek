package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshows.OnTheAirTVShows;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnTheAirTVShowsRepository extends MongoRepository<OnTheAirTVShows, ObjectId> {
    @Nonnull
    Page<OnTheAirTVShows> findAll(@Nonnull Pageable pageable);
}
