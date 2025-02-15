package com.huydevcorn.movseek.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class MoviesListResponse<T> {
    int page;
    int per_page;
    int total_results;
    int total_pages;
    List<T> results;
}
