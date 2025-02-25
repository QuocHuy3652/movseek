package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.tvshows.PopularTVShows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PopularTVShowsRepositoryImpl extends RepositoryCustomBase<PopularTVShows> {
    public PopularTVShowsRepositoryImpl(@Qualifier("secondaryMongoTemplate") MongoTemplate mongoTemplate) {
        super(mongoTemplate, PopularTVShows.class);
    }
}
