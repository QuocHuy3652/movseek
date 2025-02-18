package com.huydevcorn.movseek.model.profile;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Review {
    @Id
    private String id;
    private String user_id;
    private long media_id;
    private String media_type;
    private Double rating;
    private String comment;
    private Instant created_at;
}
