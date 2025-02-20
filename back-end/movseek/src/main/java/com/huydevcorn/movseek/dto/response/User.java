package com.huydevcorn.movseek.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @JsonProperty("id")
    String user_id;
    @JsonProperty("first_name")
    String first_name;
    @JsonProperty("last_name")
    String last_name;
    @JsonProperty("image_url")
    String avatar;
}
