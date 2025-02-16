FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Biên dịch dự án
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV USERNAME1=${USERNAME1}
ENV USERNAME2=${USERNAME2}
ENV PASSWORD1=${PASSWORD1}
ENV PASSWORD2=${PASSWORD2}

EXPOSE 8080
# Chạy ứng dụng
CMD ["java", "-jar", "app.jar"]
