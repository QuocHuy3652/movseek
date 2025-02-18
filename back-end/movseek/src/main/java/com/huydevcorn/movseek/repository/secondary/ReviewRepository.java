package com.huydevcorn.movseek.repository.secondary;

import com.huydevcorn.movseek.model.profile.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    @Query("{ 'media_id' : ?0, 'media_type' : ?1 }")
    List<Review> findByMediaId(long mediaId, String mediaType);
    @Query("{ 'user_id' : ?0, 'media_type' : ?1 }")
    List<Review> findByUserId(String userId, String mediaType);
    @Query("{ 'media_id' : ?0, 'user_id' : ?1, 'media_type' : ?2 }")
    Optional<Review> findByMediaIdAndUserId(long mediaId, String userId, String mediaType);
}
