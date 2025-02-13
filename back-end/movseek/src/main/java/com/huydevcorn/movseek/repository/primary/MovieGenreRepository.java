package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.Genre;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieGenreRepository extends MongoRepository<Genre, ObjectId> {
}
