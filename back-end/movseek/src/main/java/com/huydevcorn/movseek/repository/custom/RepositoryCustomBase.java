package com.huydevcorn.movseek.repository.custom;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public abstract class RepositoryCustomBase<T> implements RepositoryCustom<T> {
    MongoTemplate mongoTemplate;
    Class<T> entityClass;

    @Override
    public Page<T> filterEntity(
            LocalDate startDate, LocalDate endDate,
            Double startVote, Double endVote,
            List<Integer> genreIds,
            Integer timeOrder, Integer popularityOrder,
            Integer voteOrder, Integer titleOrder,
            Pageable pageable) {

        Criteria criteria = new Criteria();

        if (startDate != null && endDate != null) {
            criteria = criteria.and("release_date").gte(startDate.toString()).lte(endDate.toString());
        }

        if (startVote != null && endVote != null) {
            criteria = criteria.and("vote_average").gte(startVote/10).lte(endVote/10);
        }

        if (genreIds != null && !genreIds.isEmpty()) {
            criteria = criteria.and("genre_ids").in(genreIds);
        }

        Query query = new Query(criteria);

        List<Sort.Order> sortOrders = new ArrayList<>();
        if (timeOrder != null && (timeOrder == 1 || timeOrder == -1)) {
            sortOrders.add(new Sort.Order(timeOrder == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, "release_date"));
        }
        if (popularityOrder != null && (popularityOrder == 1 || popularityOrder == -1)) {
            sortOrders.add(new Sort.Order(popularityOrder == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, "popularity"));
        }
        if (voteOrder != null && (voteOrder == 1 || voteOrder == -1)) {
            sortOrders.add(new Sort.Order(voteOrder == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, "vote_average"));
        }
        if (titleOrder != null && (titleOrder == 1 || titleOrder == -1)) {
            sortOrders.add(new Sort.Order(titleOrder == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, "title"));
        }

        if (!sortOrders.isEmpty()) {
            query.with(Sort.by(sortOrders));
        }

        long total = mongoTemplate.count(query, entityClass);

        query.with(pageable);

        List<T> movies = mongoTemplate.find(query, entityClass);

        return new PageImpl<>(movies, pageable, total);
    }
}