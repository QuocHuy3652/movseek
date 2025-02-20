package com.huydevcorn.movseek.repository.custom;

import com.huydevcorn.movseek.model.tvshows.AiringTodayTVShows;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AiringTodayTVShowsRepositoryImpl extends RepositoryCustomBase<AiringTodayTVShows> {
    public AiringTodayTVShowsRepositoryImpl(MongoTemplate mongoTemplate) {
        super(mongoTemplate, AiringTodayTVShows.class);
    }
}
