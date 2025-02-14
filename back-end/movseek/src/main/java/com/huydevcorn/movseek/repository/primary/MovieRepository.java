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

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'genres.name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'original_title': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'overview': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'title': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'keywords.name': { $regex: ?0, $options: 'i' } } " +
                    "] } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countSearchMovies(String keyword);

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'genres.name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'original_title': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'overview': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'title': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'keywords.name': { $regex: ?0, $options: 'i' } } " +
                    "] } }",
    })
    List<Movie> searchMovies(String keyword, Pageable pageable);


    @Aggregation(pipeline = {
            "{ $match: { 'id': { $in: ?0 } } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countByIdIn(List<Long> ids);
    @Query("{ 'id': { $in: ?0 } }")
    List<Movie> findByIdIn(List<Long> ids, Pageable pageable);

    @Aggregation(pipeline = {
            "{ $match: { '_id': { $in: ?0 } } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countBy_idIn(List<ObjectId> objectIds);
    @Query("{ '_id': { $in: ?0 } }")
    List<Movie> findBy_idIn(List<ObjectId> objectIds, Pageable pageable);

    @Aggregation(pipeline = {
            "{ $match: { 'genres.id': { $in: ?0 } } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countByGenresIdIn(List<Long> genreIds);
    @Query("{ 'genres.id': { $in: ?0 } }")
    List<Movie> findByGenresIdIn(List<Long> genreIds, Pageable pageable);
}
