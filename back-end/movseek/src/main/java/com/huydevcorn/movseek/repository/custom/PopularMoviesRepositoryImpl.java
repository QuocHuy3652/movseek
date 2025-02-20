package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.movies.PopularMovies;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PopularMoviesRepositoryImpl extends RepositoryCustomBase<PopularMovies> {
    public PopularMoviesRepositoryImpl(MongoTemplate mongoTemplate) {
        super(mongoTemplate, PopularMovies.class);
    }
}
