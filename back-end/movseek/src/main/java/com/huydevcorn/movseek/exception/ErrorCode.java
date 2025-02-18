package com.huydevcorn.movseek.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_TYPE_TRENDING_MOVIE(HttpStatus.BAD_REQUEST.value(), "Invalid type of trending movie", HttpStatus.BAD_REQUEST),
    INVALID_PAGE(HttpStatus.BAD_REQUEST.value(), "Invalid page", HttpStatus.BAD_REQUEST),
    PEOPLE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "People not found", HttpStatus.NOT_FOUND),
    MOVIE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Movie not found", HttpStatus.NOT_FOUND),
    TV_SHOW_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "TV show not found", HttpStatus.NOT_FOUND),
    BLANK_QUERY(HttpStatus.BAD_REQUEST.value(), "Query cannot be blank", HttpStatus.BAD_REQUEST),
    INVALID_TYPE_SAVED_ITEM(HttpStatus.BAD_REQUEST.value(), "Invalid type of saved item", HttpStatus.BAD_REQUEST),
    INVALID_MEDIA_TYPE(HttpStatus.BAD_REQUEST.value(), "Invalid media type", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "User not found", HttpStatus.NOT_FOUND),
    MEDIA_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Media not found", HttpStatus.NOT_FOUND),
    COMMENT_ALREADY_EXISTS(HttpStatus.BAD_REQUEST.value(), "Comment already exists", HttpStatus.BAD_REQUEST),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Comment not found", HttpStatus.NOT_FOUND),
    RATING_ALREADY_EXISTS(HttpStatus.BAD_REQUEST.value(), "Rating already exists", HttpStatus.BAD_REQUEST),
    RATING_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Rating not found", HttpStatus.NOT_FOUND),
//    USER_EXISTED(HttpStatus.BAD_REQUEST.value(), "Email existed", HttpStatus.BAD_REQUEST),
//    EMPTY_EMAIL(1002, "Email cannot be empty", HttpStatus.BAD_REQUEST),
//    INVALID_EMAIL(1003, "Email is not in correct format", HttpStatus.BAD_REQUEST),
//    PW_VALIDATION(1004, "Password must be at least 7 characters", HttpStatus.BAD_REQUEST),
//    PW_CONFIRMATION(1005, "Password is different from confirm password", HttpStatus.BAD_REQUEST),
//    EMPTY_CONFIRM_PASSWORD(1006, "Confirm password cannot be empty", HttpStatus.BAD_REQUEST),
//    UNAUTHENTICATED(1007, "Unauthenticated", HttpStatus.UNAUTHORIZED),
//    USER_NOT_FOUND(1008, "User not found", HttpStatus.NOT_FOUND),
//    UNAUTHORIZED(1009, "You do not have permission", HttpStatus.FORBIDDEN),

    ;

    int code;
    String message;
    HttpStatusCode httpStatusCode;
}
