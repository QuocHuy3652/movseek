package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.movies.UpcomingMovies;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UpcomingMoviesRepositoryImpl extends RepositoryCustomBase<UpcomingMovies> {
    public UpcomingMoviesRepositoryImpl(@Qualifier("primaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, UpcomingMovies.class);
    }
}
