package com.huydevcorn.movseek.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huydevcorn.movseek.dto.response.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ClerkService {
    private final WebClient webClient;
    private final String secretKey;

    public ClerkService(@Value("${clerk.base-url}") String baseUrl,
                        @Value("${clerk.secret-key}") String secretKey,
                        WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.secretKey = secretKey;
    }

    public Mono<User> getUserInfo(String userId) {
        return webClient.get()
                .uri("/users/{userId}", userId)
                .header("Authorization", "Bearer " + secretKey)
                .retrieve()
                .bodyToMono(String.class)
                .mapNotNull(json -> {
                    ObjectMapper mapper = new ObjectMapper();
                    try {
                        return mapper.readValue(json, User.class);
                    } catch (Exception e) {
                        log.error("Failed to parse user JSON", e);
                        return null;
                    }
                });
    }
}
