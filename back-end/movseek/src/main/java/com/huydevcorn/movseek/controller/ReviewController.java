package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.request.CommentRequest;
import com.huydevcorn.movseek.dto.request.RatingRequest;
import com.huydevcorn.movseek.dto.response.*;
import com.huydevcorn.movseek.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Review", description = "Review API")
public class ReviewController {
    ReviewService reviewService;

    @GetMapping("/comments/media/{media_id}")
    @Operation(summary = "Get comments by media id")
    public ApiResponse<CommentResponse> getCommentByMediaId(@PathVariable long media_id, @RequestParam String type) {
        return ApiResponse.<CommentResponse>builder()
                .data(reviewService.getCommentByMediaId(media_id, type))
                .build();
    }

    @GetMapping("/comments/user/{user_id}")
    @Operation(summary = "Get comments by user id")
    public ApiResponse<CommentResponse> getCommentByUserId(@PathVariable String user_id, @RequestParam String type) {
        return ApiResponse.<CommentResponse>builder()
                .data(reviewService.getCommentByUserId(user_id, type))
                .build();
    }

    @PostMapping("/comments")
    @Operation(summary = "Add comment")
    public ApiResponse<String> createComment(@RequestBody CommentRequest commentRequest) {
        reviewService.addComment(commentRequest);
        return ApiResponse.<String>builder()
                .data("Comment added successfully")
                .build();
    }

    @PutMapping("/comments/user/{user_id}")
    @Operation(summary = "Update comment")
    public ApiResponse<String> updateComment(@RequestBody CommentRequest commentRequest) {
        reviewService.updateComment(commentRequest);
        return ApiResponse.<String>builder()
                .data("Comment updated successfully")
                .build();
    }

    @DeleteMapping("/comments/user/{user_id}")
    @Operation(summary = "Delete comment")
    public ApiResponse<String> deleteComment(@PathVariable String user_id, @RequestParam long media_id, @RequestParam String type) {
        reviewService.deleteComment(media_id, user_id, type);
        return ApiResponse.<String>builder()
                .data("Comment deleted successfully")
                .build();
    }

    @GetMapping("/ratings/media/{media_id}")
    @Operation(summary = "Get ratings by media id")
    public ApiResponse<RatingResponse> getRatingByMediaId(@PathVariable long media_id, @RequestParam String type) {
        return ApiResponse.<RatingResponse>builder()
                .data(reviewService.getRatingByMediaId(media_id, type))
                .build();
    }

    @GetMapping("/ratings/user/{user_id}")
    @Operation(summary = "Get ratings by user id")
    public ApiResponse<RatingByUserIdResponse> getRatingByUserId(@PathVariable String user_id) {
        return ApiResponse.<RatingByUserIdResponse>builder()
                .data(reviewService.getRatingByUserId(user_id))
                .build();
    }

    @PostMapping("/ratings")
    @Operation(summary = "Add rating")
    public ApiResponse<String> createRating(@RequestBody RatingRequest request) {
        reviewService.addRating(request);
        return ApiResponse.<String>builder()
                .data("Rating added successfully")
                .build();
    }

    @PutMapping("/ratings/user/{user_id}")
    @Operation(summary = "Update rating")
    public ApiResponse<String> updateRating(@RequestBody RatingRequest request) {
        reviewService.updateRating(request);
        return ApiResponse.<String>builder()
                .data("Rating updated successfully")
                .build();
    }

    @DeleteMapping("/ratings/user/{user_id}")
    @Operation(summary = "Delete rating")
    public ApiResponse<String> deleteRating(@PathVariable String user_id, @RequestParam long media_id, @RequestParam String type) {
        reviewService.deleteRating(media_id, user_id, type);
        return ApiResponse.<String>builder()
                .data("Rating deleted successfully")
                .build();
    }
}
