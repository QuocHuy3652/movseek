package com.huydevcorn.movseek.model.movies;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies_trending_week")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TrendingWeekMovies {
    @Id
    ObjectId _id;
    boolean adult;
    String backdrop_path;
    long[] genre_ids;
    long id;
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
