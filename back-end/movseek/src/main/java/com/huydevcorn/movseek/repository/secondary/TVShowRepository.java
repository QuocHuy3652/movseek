package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.tvshows.TVShow;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TVShowRepository extends MongoRepository<TVShow, ObjectId> {
    @Query("{ 'id' : ?0 }")
    Optional<TVShow> findById(int id);

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'genres.name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'original_name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'overview': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'name': { $regex: ?0, $options: 'i' } }, " +
                    "] } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countSearchTVShows(String keyword);

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'genres.name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'original_name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'overview': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'name': { $regex: ?0, $options: 'i' } }, " +
                    "] } }",
    })
    List<TVShow> searchTVShows(String keyword, Pageable pageable);

    @Aggregation(pipeline = {
            "{ $match: { 'id': { $in: ?0 } } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countByIdIn(List<Long> ids);
    @Query("{ 'id': { $in: ?0 } }")
    List<TVShow> findByIdIn(List<Long> ids, Pageable pageable);
}
