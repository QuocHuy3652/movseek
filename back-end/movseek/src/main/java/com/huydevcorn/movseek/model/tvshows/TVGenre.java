package com.huydevcorn.movseek.model.tvshows;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tv_genres")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TVGenre {
    @Id
    ObjectId _id;
    int id;
    String name;
}