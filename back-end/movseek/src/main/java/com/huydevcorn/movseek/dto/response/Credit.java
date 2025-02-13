package com.huydevcorn.movseek.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Credit {
    boolean adult;
    int gender;
    int id;
    String known_for_department;
    String name;
    String original_name;
    double popularity;
    String profile_path;
    int cast_id;
    String character;
    String credit_id;
    int order;
}
