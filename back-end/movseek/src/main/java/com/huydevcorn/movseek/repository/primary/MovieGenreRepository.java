package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.MovieGenre;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieGenreRepository extends MongoRepository<MovieGenre, ObjectId> {
}
