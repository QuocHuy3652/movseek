package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.dto.response.PeopleListResponse;
import com.huydevcorn.movseek.model.people.People;
import com.huydevcorn.movseek.model.people.PopularPeople;
import com.huydevcorn.movseek.service.PeopleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/person")
@Tag(name = "People", description = "People API")
public class PeopleController {
    PeopleService peopleService;

    @GetMapping("/{id}")
    @Operation(summary = "Get people by id")
    public ApiResponse<Optional<People>> getPeopleById(@PathVariable String id) {
        return ApiResponse.<Optional<People>>builder()
                .data(peopleService.getPeopleById(id))
                .build();
    }

    @GetMapping("/{id}/credits/movie")
    @Operation(summary = "Get movie credits by id")
    public ApiResponse<Object> getMovieCreditsById(@PathVariable String id) {
        return ApiResponse.builder()
                .data(peopleService.getMovieCredits(id))
                .build();
    }

    @GetMapping("/{id}/credits/tv")
    @Operation(summary = "Get tv show credits by id")
    public ApiResponse<Object> getTVCreditsById(@PathVariable String id) {
        return ApiResponse.builder()
                .data(peopleService.getTVCredits(id))
                .build();
    }

    @GetMapping("/popular")
    @Operation(summary = "Get popular people")
    public ApiResponse<PeopleListResponse<PopularPeople>> getPopularPeople(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int per_page
    ) {
        return ApiResponse.<PeopleListResponse<PopularPeople>>builder()
                .data(peopleService.getPopularPeople(page, per_page))
                .build();
    }
}
