package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.movies.TopRatedMovies;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TopRatedMoviesRepositoryImpl extends RepositoryCustomBase<TopRatedMovies> {
    public TopRatedMoviesRepositoryImpl(MongoTemplate mongoTemplate) {
        super(mongoTemplate, TopRatedMovies.class);
    }
}
