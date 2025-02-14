package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.people.People;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PeopleRepository extends MongoRepository<People, ObjectId> {
    @Query("{ 'id' : ?0 }")
    Optional<People> findById(int id);

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'also_known_as': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'biography': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'known_for_department': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'place_of_birth': { $regex: ?0, $options: 'i' } } " +
                    "] } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countSearchPeople(String keyword);

    @Aggregation(pipeline = {
            "{ $match: { $or: [ " +
                    "{ 'name': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'also_known_as': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'biography': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'known_for_department': { $regex: ?0, $options: 'i' } }, " +
                    "{ 'place_of_birth': { $regex: ?0, $options: 'i' } } " +
                    "] } }",
    })
    List<People> searchPeople(String keyword, Pageable pageable);

    @Aggregation(pipeline = {
            "{ $match: { 'id': { $in: ?0 } } }",
            "{ $count: 'totalResults' }"
    })
    Optional<Long> countByIdIn(List<Long> ids);
    @Query("{ 'id': { $in: ?0 } }")
    List<People> findByIdIn(List<Long> ids, Pageable pageable);
}
