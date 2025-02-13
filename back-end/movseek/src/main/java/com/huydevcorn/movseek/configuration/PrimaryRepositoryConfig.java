package com.huydevcorn.movseek.configuration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(
        basePackages = "com.huydevcorn.movseek.repository.primary",
        mongoTemplateRef = "primaryMongoTemplate"
)
public class PrimaryRepositoryConfig {
    @Value("${spring.data.mongodb.primary.uri}")
    private String primaryMongoUri;

    @Primary
    @Bean(name = "primaryMongoClient")
    public MongoClient primaryMongoClient() {
        return MongoClients.create(primaryMongoUri);
    }

    @Primary
    @Bean(name = "primaryMongoTemplate")
    public MongoTemplate primaryMongoTemplate() {
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(primaryMongoClient(), "MovSeek"));
    }
}
