package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.people.People;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PeopleRepository extends MongoRepository<People, ObjectId> {
    @Query("{ 'id' : ?0 }")
    Optional<People> findById(int id);
}
