package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.UpcomingMovies;
import com.huydevcorn.movseek.repository.custom.RepositoryCustom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpcomingMoviesRepository extends MongoRepository<UpcomingMovies, ObjectId>, RepositoryCustom<UpcomingMovies> {
}
