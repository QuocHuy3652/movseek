package com.huydevcorn.movseek.model.tvshows;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tv_on_the_air")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OnTheAirTVShows {
    @Id
    ObjectId _id;
    boolean adult;
    String backdrop_path;
    long[] genre_ids;
    long id;
    String original_language;
    String original_name;
    String overview;
    double popularity;
    String poster_path;
    String first_air_date;
    String name;
    double vote_average;
    int vote_count;
    String[] origin_country;
}
