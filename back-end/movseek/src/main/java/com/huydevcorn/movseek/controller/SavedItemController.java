package com.huydevcorn.movseek.controller;

import com.huydevcorn.movseek.dto.request.SavedItemRequest;
import com.huydevcorn.movseek.dto.response.ApiResponse;
import com.huydevcorn.movseek.dto.response.SavedItemResponse;
import com.huydevcorn.movseek.service.SavedItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/saved-item")
@Tag(name = "Saved item", description = "Saved item API")
public class SavedItemController {
    SavedItemService savedItemService;

    @GetMapping("/{user_id}")
    @Operation(summary = "Get save item by user_id")
    public ApiResponse<SavedItemResponse> getSavedItemByUser_id(@PathVariable String user_id, @RequestParam String type) {
        return ApiResponse.<SavedItemResponse>builder()
                .data(savedItemService.getSavedItemByUser_id(user_id, type))
                .build();
    }

    @PutMapping("/add")
    @Operation(summary = "Add save item")
    public ApiResponse<String> addSavedItem(@RequestBody SavedItemRequest request) {
        savedItemService.addSavedItem(request);
        return ApiResponse.<String>builder()
                .data("Add successfully")
                .build();
    }

    @PutMapping("remove")
    @Operation(summary = "Remove save item")
    public ApiResponse<String> removeSavesItem(@RequestBody SavedItemRequest request) {
        savedItemService.removeSavedItem(request);
        return ApiResponse.<String>builder()
                .data("Remove successfully")
                .build();
    }


}
