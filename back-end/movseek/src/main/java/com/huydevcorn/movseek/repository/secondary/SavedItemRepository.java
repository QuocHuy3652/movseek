package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.profile.SavedItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SavedItemRepository extends MongoRepository<SavedItem, String> {
    @Query("{ 'user_id' : ?0 }")
    Optional<SavedItem> findSavedItemByUser_id(String user_id);
}
