package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.request.ReviewRequest;
import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.dto.response.CommentResponse;
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
    @Operation(summary = "Get comment by media id")
    public ApiResponse<CommentResponse> getCommentByMediaId(@PathVariable long media_id, @RequestParam String type) {
        return ApiResponse.<CommentResponse>builder()
                .data(reviewService.getCommentByMediaId(media_id, type))
                .build();
    }

    @GetMapping("/comments/user/{user_id}")
    @Operation(summary = "Get comment by user id")
    public ApiResponse<CommentResponse> getCommentByUserId(@PathVariable String user_id, @RequestParam String type) {
        return ApiResponse.<CommentResponse>builder()
                .data(reviewService.getCommentByUserId(user_id, type))
                .build();
    }

    @PostMapping("/comments")
    @Operation(summary = "Add comment")
    public ApiResponse<String> createComment(@RequestBody ReviewRequest reviewRequest) {
        reviewService.addComment(reviewRequest);
        return ApiResponse.<String>builder()
                .data("Comment added successfully")
                .build();
    }

    @PutMapping("/comments/{user_id}")
    @Operation(summary = "Update comment")
    public ApiResponse<String> updateComment(@RequestBody ReviewRequest reviewRequest) {
        reviewService.updateComment(reviewRequest);
        return ApiResponse.<String>builder()
                .data("Comment updated successfully")
                .build();
    }

    @DeleteMapping("/comments/{user_id}")
    @Operation(summary = "Delete comment")
    public ApiResponse<String> deleteComment(@PathVariable String user_id, @RequestParam long media_id, @RequestParam String type) {
        reviewService.deleteComment(media_id, user_id, type);
        return ApiResponse.<String>builder()
                .data("Comment deleted successfully")
                .build();
    }
}
