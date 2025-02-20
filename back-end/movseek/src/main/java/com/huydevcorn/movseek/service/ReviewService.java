package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.request.CommentRequest;
import com.huydevcorn.movseek.dto.request.RatingRequest;
import com.huydevcorn.movseek.dto.response.*;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.profile.Review;
import com.huydevcorn.movseek.repository.secondary.ReviewRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReviewService {
    ReviewRepository reviewRepository;
    ClerkService clerkService;

    public CommentResponse getCommentByMediaId(long mediaId, String mediaType) {
        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }
        List<Comment> comments = Flux.fromIterable(reviewRepository.findByMediaId(mediaId, mediaType))
                .filter(review -> review.getComment() != null)
                .flatMap(review -> clerkService.getUserInfo(review.getUser_id())
                        .map(user -> Comment.builder()
                                .user_id(review.getUser_id())
                                .username(user.getFirst_name() + " " + user.getLast_name())
                                .avatar(user.getAvatar())
                                .comment(review.getComment())
                                .created_at(review.getCreated_at())
                                .build()))
                .collectList()
                .block();

        return CommentResponse.builder()
                .media_id(mediaId)
                .type(mediaType)
                .comments(comments != null ? comments : List.of())
                .build();
    }

    public CommentResponse getCommentByUserId(String userId, String mediaType) {
        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }
        List<Comment> comments = Flux.fromIterable(reviewRepository.findByUserId(userId, mediaType))
                .filter(review -> review.getComment() != null)
                .flatMap(review -> clerkService.getUserInfo(review.getUser_id())
                        .map(user -> Comment.builder()
                                .user_id(review.getUser_id())
                                .media_id(review.getMedia_id())
                                .username(user.getFirst_name() + " " + user.getLast_name())
                                .avatar(user.getAvatar())
                                .comment(review.getComment())
                                .created_at(review.getCreated_at())
                                .build()))
                .collectList()
                .block();

        return CommentResponse.builder()
                .user_id(userId)
                .type(mediaType)
                .comments(comments != null ? comments : List.of())
                .build();
    }

    public void addComment(CommentRequest request) {
        String userId = request.getUser_id();
        long mediaId = request.getMedia_id();
        String mediaType = request.getType();
        String commentText = request.getComment();

        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isPresent()) {
            if (existingReview.get().getComment() != null) {
                throw new AppException(ErrorCode.COMMENT_ALREADY_EXISTS);
            } else {
                Review review = existingReview.get();
                review.setComment(commentText);
                review.setCreated_at(Instant.now());
                reviewRepository.save(review);
            }
        } else {
            Review newReview = Review.builder()
                    .id(UUID.randomUUID().toString())
                    .user_id(userId)
                    .media_id(mediaId)
                    .media_type(mediaType)
                    .comment(commentText)
                    .rating(null)
                    .created_at(Instant.now())
                    .build();

            reviewRepository.save(newReview);
        }

    }

    public void updateComment(CommentRequest request) {
        String userId = request.getUser_id();
        long mediaId = request.getMedia_id();
        String mediaType = request.getType();
        String commentText = request.getComment();

        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isEmpty()) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }

        Review updatedReview = existingReview.get();
        updatedReview.setComment(commentText);
        updatedReview.setCreated_at(Instant.now());

        reviewRepository.save(updatedReview);
    }

    public void deleteComment(long mediaId, String userId, String mediaType) {
        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isEmpty()) {
            throw new AppException(ErrorCode.COMMENT_NOT_FOUND);
        }
        Review review = existingReview.get();

        if (review.getRating() == null) {
            reviewRepository.delete(review);
        } else {
            review.setComment(null);
            reviewRepository.save(review);
        }
    }

    public RatingResponse getRatingByMediaId(long mediaId, String mediaType) {
        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }
        List<Rating> ratings = Flux.fromIterable(reviewRepository.findByMediaId(mediaId, mediaType))
                .filter(review -> review.getRating() != null)
                .flatMap(review -> clerkService.getUserInfo(review.getUser_id())
                        .map(user -> Rating.builder()
                                .user_id(review.getUser_id())
                                .username(user.getFirst_name() + " " + user.getLast_name())
                                .avatar(user.getAvatar())
                                .rating(review.getRating())
                                .created_at(review.getCreated_at())
                                .build()))
                .collectList()
                .block();

        ratings = (ratings != null) ? ratings : List.of();

        return RatingResponse.builder()
                .media_id(mediaId)
                .type(mediaType)
                .average(ratings.stream().mapToDouble(Rating::getRating).average().orElse(0))
                .count(ratings.size())
                .ratings(ratings)
                .build();
    }

    public RatingByUserIdResponse getRatingByUserId(String userId) {
        User user = clerkService.getUserInfo(userId).block();
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        log.info("User: {}", user);
        List<RatingByUserId> ratings = reviewRepository.findByUserId(userId)
                .stream()
                .filter(review -> review.getRating() != null)
                .map(review -> RatingByUserId.builder()
                        .media_id(review.getMedia_id())
                        .type(review.getMedia_type())
                        .rating(review.getRating())
                        .created_at(review.getCreated_at())
                        .build())
                .toList();

        return RatingByUserIdResponse.builder()
                .user_id(userId)
                .username(user.getFirst_name() + " " + user.getLast_name())
                .avatar(user.getAvatar())
                .ratings(ratings)
                .average(ratings.stream().mapToDouble(RatingByUserId::getRating).average().orElse(0))
                .count(ratings.size())
                .build();
    }


    public void addRating(RatingRequest request) {
        String userId = request.getUser_id();
        long mediaId = request.getMedia_id();
        String mediaType = request.getType();
        double rating = request.getRating();

        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isPresent()) {
            if (existingReview.get().getRating() != null) {
                throw new AppException(ErrorCode.RATING_ALREADY_EXISTS);
            } else {
                Review review = existingReview.get();
                review.setRating(rating);
                review.setCreated_at(Instant.now());
                reviewRepository.save(review);
            }
        } else {
            Review newReview = Review.builder()
                    .id(UUID.randomUUID().toString())
                    .user_id(userId)
                    .media_id(mediaId)
                    .media_type(mediaType)
                    .comment(null)
                    .rating(rating)
                    .created_at(Instant.now())
                    .build();
            reviewRepository.save(newReview);
        }

    }

    public void updateRating(RatingRequest request) {
        String userId = request.getUser_id();
        long mediaId = request.getMedia_id();
        String mediaType = request.getType();
        double rating = request.getRating();

        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isEmpty()) {
            throw new AppException(ErrorCode.RATING_NOT_FOUND);
        }

        Review updatedReview = existingReview.get();
        updatedReview.setRating(rating);
        updatedReview.setCreated_at(Instant.now());

        reviewRepository.save(updatedReview);
    }

    public void deleteRating(long mediaId, String userId, String mediaType) {
        if (!mediaType.equals("movie") && !mediaType.equals("tv_show")) {
            throw new AppException(ErrorCode.INVALID_MEDIA_TYPE);
        }

        Optional<Review> existingReview = reviewRepository.findByMediaIdAndUserId(mediaId, userId, mediaType);

        if (existingReview.isEmpty()) {
            throw new AppException(ErrorCode.RATING_NOT_FOUND);
        }
        Review review = existingReview.get();

        if (review.getComment() == null) {
            reviewRepository.delete(review);
        } else {
            review.setRating(null);
            reviewRepository.save(review);
        }
    }


}
