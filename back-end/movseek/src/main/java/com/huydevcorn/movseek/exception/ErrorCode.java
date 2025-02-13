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
