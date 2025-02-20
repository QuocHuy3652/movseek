package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.tvshows.OnTheAirTVShows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OnTheAirTVShowsRepositoryImpl extends RepositoryCustomBase<OnTheAirTVShows> {
    public OnTheAirTVShowsRepositoryImpl(@Qualifier("secondaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, OnTheAirTVShows.class);
    }
}
