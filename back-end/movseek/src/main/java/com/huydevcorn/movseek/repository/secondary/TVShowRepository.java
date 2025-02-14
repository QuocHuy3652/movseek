package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshow.TVShow;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TVShowRepository extends MongoRepository<TVShow, ObjectId> {
    @Query("{ 'id' : ?0 }")
    Optional<TVShow> findById(int id);
}
