package com.huydevcorn.movseek.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RatingResponse {
    long media_id;
    String user_id;
    String type;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    double average;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    int count;
    List<Rating> ratings;
}
