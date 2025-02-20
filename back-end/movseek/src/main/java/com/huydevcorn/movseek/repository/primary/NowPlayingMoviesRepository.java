package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.NowPlayingMovies;
import com.huydevcorn.movseek.repository.custom.RepositoryCustom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NowPlayingMoviesRepository extends MongoRepository<NowPlayingMovies, ObjectId>, RepositoryCustom<NowPlayingMovies> {
}
