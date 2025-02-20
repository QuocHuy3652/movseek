package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshows.PopularTVShows;
import com.huydevcorn.movseek.repository.custom.RepositoryCustom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PopularTVShowsRepository extends MongoRepository<PopularTVShows, ObjectId>, RepositoryCustom<PopularTVShows> {
}
