package com.huydevcorn.movseek.model.people;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "people")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class People {
    @Id
    ObjectId _id;
    boolean adult;
    String[] also_known_as;
    String biography;
    String birthday;
    String deathday; // Use String to handle null values
    int gender;
    String homepage;
    long id;
    String imdb_id;
    String known_for_department;
    String name;
    String place_of_birth;
    double popularity;
    String profile_path;
    Object movie_credits;
    Object tv_credits;
}
