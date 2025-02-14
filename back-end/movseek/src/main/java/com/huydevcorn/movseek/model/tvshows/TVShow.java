package com.huydevcorn.movseek.model.tvshows;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tv_show")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TVShow {
    @Id
    ObjectId _id;
    int vote_count;
    String backdrop_path;
    TVGenre[] genres;
    String id;
    String homepage;
    String[] origin_country;
    String original_language;
    String original_name;
    String overview;
    double popularity;
    String poster_path;
    String first_air_date;
    String last_air_date;
    int number_of_episodes;
    int number_of_seasons;
    String status;
    String tagline;
    String type;
    String name;
    double vote_average;
}
