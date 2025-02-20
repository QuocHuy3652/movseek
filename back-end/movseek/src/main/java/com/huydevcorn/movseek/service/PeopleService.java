package com.huydevcorn.movseek.service;

import com.huydevcorn.movseek.dto.response.PeopleListResponse;
import com.huydevcorn.movseek.exception.AppException;
import com.huydevcorn.movseek.exception.ErrorCode;
import com.huydevcorn.movseek.model.people.People;
import com.huydevcorn.movseek.model.people.PopularPeople;
import com.huydevcorn.movseek.repository.secondary.PeopleRepository;
import com.huydevcorn.movseek.repository.secondary.PopularPeopleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PeopleService {
    PeopleRepository peopleRepository;
    PopularPeopleRepository popularPeopleRepository;

    public Optional<People> getPeopleById(String id) {
        Optional<People> people = peopleRepository.findById(Integer.parseInt(id));
        if (people.isPresent()) {
            return people;
        } else {
            throw new AppException(ErrorCode.PEOPLE_NOT_FOUND);
        }
    }

    public PeopleListResponse<PopularPeople> getPopularPeople(int page, int per_page) {
        if (page < 1) {
            throw new AppException(ErrorCode.INVALID_PAGE);
        }
        Pageable pageable = PageRequest.of(page - 1, per_page);
        long totalResults = popularPeopleRepository.count();
        return PeopleListResponse.<PopularPeople>builder()
                .page(page)
                .per_page(per_page)
                .total_results((int) totalResults)
                .total_pages((int) Math.ceil((double) totalResults / per_page))
                .results(popularPeopleRepository.findAll(pageable).getContent())
                .build();
    }

    public Object getMovieCredits(String id) {
        Optional<People> people = peopleRepository.findById(Integer.parseInt(id));
        if (people.isPresent()) {
            return people.get().getMovie_credits();
        } else {
            throw new AppException(ErrorCode.PEOPLE_NOT_FOUND);
        }
    }

    public Object getTVCredits(String id) {
        Optional<People> people = peopleRepository.findById(Integer.parseInt(id));
        if (people.isPresent()) {
            return people.get().getTv_credits();
        } else {
            throw new AppException(ErrorCode.PEOPLE_NOT_FOUND);
        }
    }

}
