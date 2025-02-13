package com.huydevcorn.movseek.model.movies;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies_upcoming")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpcomingMovies {
    @Id
    ObjectId _id;
    boolean adult;
    String backdrop_path;
    int[] genre_ids;
    int id;
    String original_language;
    String original_title;
    String overview;
    double popularity;
    String poster_path;
    String release_date;
    String title;
    boolean video;
    double vote_average;
    int vote_count;
}
