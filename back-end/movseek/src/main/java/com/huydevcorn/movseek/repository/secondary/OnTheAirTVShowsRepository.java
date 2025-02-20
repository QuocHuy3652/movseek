package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshows.OnTheAirTVShows;
import com.huydevcorn.movseek.repository.custom.RepositoryCustom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnTheAirTVShowsRepository extends MongoRepository<OnTheAirTVShows, ObjectId>, RepositoryCustom<OnTheAirTVShows> {
}
