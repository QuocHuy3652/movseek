package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.tvshows.TopRatedTVShows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TopRatedTVShowsRepositoryImpl extends RepositoryCustomBase<TopRatedTVShows> {
    public TopRatedTVShowsRepositoryImpl(@Qualifier("secondaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, TopRatedTVShows.class);
    }
}
