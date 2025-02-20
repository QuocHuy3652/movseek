package com.huydevcorn.movseek.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RepositoryCustom<T> {
    Page<T> filterEntity(
            LocalDate startDate, LocalDate endDate,
            Double startVote, Double endVote,
            List<Integer> genreIds,
            Integer timeOrder, Integer popularityOrder,
            Integer voteOrder, Integer titleOrder,
            Pageable pageable);
}
