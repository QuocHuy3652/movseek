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
public class RatingByUserIdResponse {
    String user_id;
    String username;
    String avatar;
    double average;
    int count;
    List<RatingByUserId> ratings;
}
