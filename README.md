# 📽️ MovSeek - Movie & TV Show Recommendation Platform

MovSeek is a platform that helps you search and explore popular movies and TV shows.

---

## 🗄️ **Database**

- **MongoDB Atlas** is used as the primary database.
- The system stores **two types of data**: **Movies** and **TV Shows** in **separate databases**.
- **Data is sourced from TMDB as of December 2024**.

---

## 🏗️ **Technologies Used**

### 🔹 **Backend (Java Spring Boot & MongoDB)**

- **Java 21** + **Spring Boot**
- **MongoDB Atlas** (with two databases)
- **Spring Data MongoDB**
- **OpenAPI (Swagger)**
- **Spring WebFlux** (Utilizing **Reactive Programming** to fetch user data from **Clerk**)

### 🔹 **Frontend (Next.js & TypeScript)**

- **Next.js** (React framework) + **TypeScript**
- **TailwindCSS** (UI Styling) + **ShadCN** (UI Components)
- **Clerk** (User authentication)

---

## 📦 **Deployment**

### **🔹 Backend on Railway**

- **MovSeek API**: [https://movseek.onrender.com/api/v1](https://movseek.onrender.com/api/v1)
- 📄 **Swagger Docs**: [API Documentation](https://movseek.onrender.com/api/v1/swagger-ui/index.html#/)

### **🔹 Frontend on Vercel**

- **MovSeek Website**: [https://movseek-website.vercel.app/](https://movseek-website.vercel.app/)

*note: Due to using a free hosting version, the server will spin down after a period of inactivity, which can delay the first request by 1 minute or more. Please call the API at [API Documentation](https://movseek.onrender.com/api/v1/swagger-ui/index.html#/) on a browser a few minutes beforehand to ensure a smoother experience.

---

## 🐳 **Build Backend with Docker**

### **1️⃣ Build Docker Image**

```sh
docker build -t movseek-backend .
```

### **2️⃣ Run Docker Container**

```sh
docker run -p 8080:8080 --env-file .env movseek-backend
```

Note: You need to create a .env file containing the necessary environment variables.

---

## 🏆 **Key Features**

### 🎬 **Search & Explore**

- Search for movies and TV shows by **title, genre, actor, director, etc.**
- Browse and sort **movie & TV show lists** such as **Popular, Top Rated, etc.**
- **Pagination support** for seamless navigation.

### ⭐ **Ratings & Reviews**

- Display **ratings and reviews** of movie/tv show.
- Users can **rate movies or TV shows**.

### 🎭 **Movie & TV Show Details**

- Display **summary, genre, cast, director, release year, trailer, images, etc.**
- Suggest **similar movies & TV shows**.

### 🎭 **People Information**

- View **detailed information** about actors, directors, and other people in the industry.
- See the **list of movies & TV shows** they have participated in.

### 🏷️ **Personal Lists**

- Save movies to **Watchlist** (To-watch list).
- Mark movies as **favorite**.
- Manage **rating lists**.

### 🏆 **User Authentication & Management**

- Sign up & log in using **Clerk Authentication** (Google, Facebook, Email, etc.).

### 🔍 **Natural Language Movie Search & Recommendations**

- **Get movie suggestions using natural language queries**
  - Example: _"Films that have hero"_ will find movies with **hero themes**.
- **Navigate users to the relevant page based on natural language queries**
  - Example: _"Cast of Moana"_ will direct users to the **cast page** of **Moana**.
- _Note:_ This feature integrates a third-party API: **[RAG-LLM](https://github.com/slimedemon/RAG-LLM)**.
