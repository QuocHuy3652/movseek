package com.huydevcorn.movseek.repository.primary;

import com.huydevcorn.movseek.model.movies.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    @Query("{ 'id' : ?0 }")
    Optional<Movie> findById(int id);

    @Aggregation(pipeline = {
            "{ $match: { 'trailers': { $exists: true, $ne: [] } } }",
            "{ $set: { 'latestTrailer': { $filter: { input: '$trailers', as: 't', cond: { $eq: ['$$t.site', 'YouTube'] } } } } }",
            "{ $set: { 'latestTrailer': { $arrayElemAt: [{ $sortArray: { input: '$latestTrailer', sortBy: { 'published_at': -1 } } }, 0] } } }",
            "{ $sort: { 'latestTrailer.published_at': -1 } }"
    })
    List<Movie> findLatestMoviesTrailers(Pageable pageable);


}
