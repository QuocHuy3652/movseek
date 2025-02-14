package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshow.TVGenre;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TVGenreRepository extends MongoRepository<TVGenre, ObjectId> {
}
