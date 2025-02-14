package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshow.TopRatedTVShows;
import jakarta.annotation.Nonnull;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopRatedTVShowsRepository extends MongoRepository<TopRatedTVShows, ObjectId> {
    @Nonnull
    Page<TopRatedTVShows> findAll(@Nonnull Pageable pageable);
}
