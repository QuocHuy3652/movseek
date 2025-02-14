package com.huydevcorn.movseek.model.people;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "people_popular")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PopularPeople {
    @Id
    ObjectId _id;
    boolean adult;
    int gender;
    int id;
    String known_for_department;
    String name;
    String original_name;
    double popularity;
    String profile_path;
    Object[] known_for;
}
