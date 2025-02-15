package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.dto.response.MoviesListResponse;
import com.huydevcorn.movseek.dto.response.PeopleListResponse;
import com.huydevcorn.movseek.dto.response.TVListResponse;
import com.huydevcorn.movseek.model.movies.Movie;
import com.huydevcorn.movseek.model.people.People;
import com.huydevcorn.movseek.model.tvshows.TVShow;
import com.huydevcorn.movseek.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.Explode;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.enums.ParameterStyle;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/search")
@Tag(name = "Search", description = "Search API")
public class SearchController {
    SearchService searchService;

    @GetMapping("/movie")
    @Operation(summary = "Search movies")
    public ApiResponse<MoviesListResponse<Movie>> searchMovies(
            @RequestParam(required = false) String query,

            @Parameter(
                    in = ParameterIn.QUERY,
                    description = "List of movie IDs",
                    array = @ArraySchema(schema = @Schema(type = "Long")),
                    style = ParameterStyle.FORM,
                    explode = Explode.TRUE
            )
            @RequestParam(required = false) List<Long> ids,

            @Parameter(
                    in = ParameterIn.QUERY,
                    description = "List of movie object IDs",
                    array = @ArraySchema(schema = @Schema(type = "String"))
            )
            @RequestParam(required = false) List<String> object_ids,

            @Parameter(
                    in = ParameterIn.QUERY,
                    description = "List of genre movie object IDs",
                    array = @ArraySchema(schema = @Schema(type = "String"))
            )
            @RequestParam(required = false) List<String> genre_object_ids,

            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<MoviesListResponse<Movie>>builder()
                .data(searchService.searchMovies(query, ids, object_ids, genre_object_ids, page, per_page))
                .build();
    }

    @GetMapping("/tv")
    @Operation(summary = "Search tv shows")
    public ApiResponse<TVListResponse<TVShow>> searchTVShows(
            @RequestParam(required = false) String query,

            @Parameter(
                    in = ParameterIn.QUERY,
                    description = "List of tv show IDs",
                    array = @ArraySchema(schema = @Schema(type = "Long")),
                    style = ParameterStyle.FORM,
                    explode = Explode.TRUE
            )
            @RequestParam(required = false) List<Long> ids,

            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<TVListResponse<TVShow>>builder()
                .data(searchService.searchTVShows(query, ids, page, per_page))
                .build();
    }

    @GetMapping("/person")
    @Operation(summary = "Search people")
    public ApiResponse<PeopleListResponse<People>> searchPeople(
            @RequestParam(required = false) String query,

            @Parameter(
                    in = ParameterIn.QUERY,
                    description = "List of people IDs",
                    array = @ArraySchema(schema = @Schema(type = "Long")),
                    style = ParameterStyle.FORM,
                    explode = Explode.TRUE
            )
            @RequestParam(required = false) List<Long> ids,

            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<PeopleListResponse<People>>builder()
                .data(searchService.searchPeople(query, ids, page, per_page))
                .build();
    }

}
