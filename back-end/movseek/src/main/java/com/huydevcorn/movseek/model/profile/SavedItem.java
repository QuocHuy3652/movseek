package com.huydevcorn.movseek.model.profile;

import com.huydevcorn.movseek.dto.response.Favorite;
import com.huydevcorn.movseek.dto.response.Watchlist;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "saved_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedItem {
    @Id
    String user_id;
    Watchlist watchlist;
    Favorite favorite;
}
