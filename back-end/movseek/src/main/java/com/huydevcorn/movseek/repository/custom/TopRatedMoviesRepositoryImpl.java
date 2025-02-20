package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.movies.TopRatedMovies;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TopRatedMoviesRepositoryImpl extends RepositoryCustomBase<TopRatedMovies> {
    public TopRatedMoviesRepositoryImpl(@Qualifier("primaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, TopRatedMovies.class);
    }
}
