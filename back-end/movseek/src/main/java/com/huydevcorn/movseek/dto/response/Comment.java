package com.huydevcorn.movseek.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Comment {
    String user_id;
    long media_id;
    String username;
    String avatar;
    String comment;
    Instant created_at;
}
