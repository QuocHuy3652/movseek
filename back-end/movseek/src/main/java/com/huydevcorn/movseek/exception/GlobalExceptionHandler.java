package com.huydevcorn.movseek.exception;

import com.huydevcorn.movseek.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<String>> handlingException() {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED.getMessage());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED.getHttpStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<String>> handlingAppException(AppException appException) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(appException.getErrorCode().getCode());
        apiResponse.setMessage(appException.getErrorCode().getMessage());
        return ResponseEntity.status(appException.getErrorCode().getHttpStatusCode()).body(apiResponse);
    }
}
