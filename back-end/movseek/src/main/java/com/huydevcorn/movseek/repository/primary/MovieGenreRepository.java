package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.MovieGenre;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieGenreRepository extends MongoRepository<MovieGenre, ObjectId> {
    @Query("{ '_id': { $in: ?0 } }")
    List<MovieGenre> findBy_idIn(List<ObjectId> objectIds, Pageable pageable);
}
