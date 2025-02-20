package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.movies.NowPlayingMovies;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class NowPlayingMoviesRepositoryImpl extends RepositoryCustomBase<NowPlayingMovies> {
    public NowPlayingMoviesRepositoryImpl(@Qualifier("primaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, NowPlayingMovies.class);
    }
}
