package com.huydevcorn.movseek.configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        basePackages = "com.huydevcorn.movseek.repository.secondary",
        mongoTemplateRef = "secondaryMongoTemplate"
)
public class SecondaryRepositoryConfig {
    @Value("${spring.data.mongodb.secondary.uri}")
    private String secondaryMongoUri;

    @Bean(name = "secondaryMongoClient")
    public MongoClient secondaryMongoClient() {
        return MongoClients.create(secondaryMongoUri);
    }

    @Bean(name = "secondaryMongoTemplate")
    public MongoTemplate secondaryMongoTemplate() {
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(secondaryMongoClient(), "MovSeek"));
    }
}
