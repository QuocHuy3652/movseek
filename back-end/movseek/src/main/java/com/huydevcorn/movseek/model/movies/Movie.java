package com.huydevcorn.movseek.model.movies;

import com.huydevcorn.movseek.dto.response.CreditResponse;
import com.huydevcorn.movseek.dto.response.KeywordResponse;
import com.huydevcorn.movseek.dto.response.TrailerResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Movie {
    @Id
    ObjectId _id;
    int id;
    String backdrop_path;
    int budget;
    List<Genre> genres;
    String homepage;
    List<String> origin_country;
    String original_language;
    String original_title;
    String overview;
    double popularity;
    String poster_path;
    String release_date;
    int revenue;
    int runtime;
    String status;
    String tagline;
    String title;
    double vote_average;
    int vote_count;
    List<TrailerResponse> trailers;
    List<KeywordResponse> keywords;
    CreditResponse credits;
}
