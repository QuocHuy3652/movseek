export const TMDB_API = {
  TRENDING: (mediaType: 'all' | 'movie' | 'tv' | 'person', timeWindow: 'day' | 'week') =>
    `/${mediaType}/trending/${timeWindow}?page=1&per_page=18`,

  MOVIE_DETAILS: (movieId: number) => `/movie/${movieId}`,
  MOVIE_CREDITS: (movieId: number) => `/movie/${movieId}/credits`,
  MOVIE_KEYWORDS: (movieId: number) => `/movie/${movieId}/keywords`,
  MOVIE_VIDEOS: (movieId: number) => `/movie/${movieId}/videos`,

  TV_DETAILS: (tvId: number) => `/tvshow/${tvId}`,
  TV_CREDITS: (tvId: number) => `/tvshow/${tvId}/credits`,
  TV_KEYWORDS: (tvId: number) => `/tvshow/${tvId}/keywords`,
  TV_VIDEOS: (tvId: number) => `/tvshow/${tvId}/videos`,
  TV_CREDITS_TMDB: (tvId: number) => `/tv/${tvId}/credits`,
  TV_KEYWORDS_TMDB: (tvId: number) => `/tv/${tvId}/keywords`,
  TV_VIDEOS_TMDB: (tvId: number) => `/tv/${tvId}/videos`,

  SEARCH_MOVIE: (query: string, page: number) => `/search/movie?query=${query}&page=${page}&per_page=18`,
  SEARCH_SPECIFIC_MOVIE: (ids: string, page: number) => `/search/movie?page=${page}&per_page=30${ids ? `&${ids}` : ''}`,
  SEARCH_TV: (query: string, page: number) => `/search/tv?query=${query}&page=${page}&per_page=18`,
  SEARCH_SPECIFIC_TV: (ids: string, page: number) => `/search/tv?page=${page}&per_page=30${ids ? `&${ids}` : ''}`,
  SEARCH_PERSON: (query: string, page: number) => `/search/person?query=${query}&page=${page}&per_page=18`,
  SEARCH_SPECIFIC_PERSON: (ids: string, page: number) =>
    `/search/person?page=${page}&per_page=30${ids ? `&${ids}` : ''}`,

  POSTER: (poster: string) => `https://image.tmdb.org/t/p/original/${poster}`,
  THUMBNAIL: (thumbnail: string) => `https://image.tmdb.org/t/p/w710_and_h400_multi_faces/${thumbnail}`,

  PEOPLE_POPULAR: (page: number) => `/person/popular?page=${page}&per_page=18`,
  PEOPLE_DETAIL: (id: number) => `/person/${id}`,
  PEOPLE_MOVIE_CREDITS: (id: number) => `/person/${id}/credits/movie`,
  PEOPLE_TV_CREDITS: (id: number) => `/person/${id}/credits/tv`,

  GENRES_MOVIE: () => `/movie/genres`,
  MOVIE_POPULAR: (page: number, params: string) =>
    `/movie/popular?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  MOVIE_TOP_RATED: (page: number, params: string) =>
    `/movie/top-rated?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  MOVIE_NOW_PLAYING: (page: number, params: string) =>
    `/movie/now-playing?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  MOVIE_UPCOMING: (page: number, params: string) =>
    `/movie/upcoming?page=${page}&per_page=18${params ? `&${params}` : ''}`,

  MOVIE_LATEST_TRAILERS: () => `/movie/trailer/latest?page=2&per_page=15`,

  GENRES_TV: () => `/tvshow/genres`,
  TV_POPULAR: (page: number, params: string) => `/tvshow/popular?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  TV_TOP_RATED: (page: number, params: string) =>
    `/tvshow/top-rated?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  TV_ON_THE_AIR: (page: number, params: string) =>
    `/tvshow/on-the-air?page=${page}&per_page=18${params ? `&${params}` : ''}`,
  TV_AIRING_TODAY: (page: number, params: string) =>
    `/tvshow/airing-today?page=${page}&per_page=18${params ? `&${params}` : ''}`,

  ADD_SAVED_ITEM: () => `/saved-item/add`,
  REMOVE_SAVED_ITEM: () => `/saved-item/remove`,
  GET_FAVORITE_ITEM: (userId: string) => `/saved-item/${userId}?type=favorite`,
  GET_WATCHLIST_ITEM: (userId: string) => `/saved-item/${userId}?type=watchlist`,

  ADD_REVIEW: () => `/comments`,
  GET_REVIEWS_BY_MEDIA: (mediaId: number, type: string) => `/comments/media/${mediaId}?type=${type}`,
  GET_REVIEWS_BY_USER: (userId: string) => `/comments/user/${userId}`,
  UPDATE_REVIEWS: (userId: string) => `/comments/user/${userId}`,
  DELETE_REVIEWS: (userId: string, mediaId: number, type: string) =>
    `/comments/user/${userId}?media_id=${mediaId}&type=${type}`,

  ADD_RATING: () => `/ratings`,
  GET_RATINGS_BY_MEDIA: (mediaId: number, type: string) => `/ratings/media/${mediaId}?type=${type}`,
  GET_RATINGS_BY_USER: (userId: string) => `/ratings/user/${userId}`,
  UPDATE_RATINGS: (userId: string) => `/ratings/user/${userId}`,
  DELETE_RATINGS: (userId: string, mediaId: number, type: string) =>
    `/ratings/user/${userId}?media_id=${mediaId}&type=${type}`,

  LLM_RETRIEVER: (collection_name: string, query: string, amount: number, threshold: number) =>
    `/retriever/?llm_api_key=${process.env.NEXT_PUBLIC_LLM_API_KEY}&collection_name=${collection_name}&query=${query}&amount=${amount}&threshold=${threshold}`,
  LLM_NAVIGATE: (query: string) => `/navigate/?llm_api_key=${process.env.NEXT_PUBLIC_LLM_API_KEY}&query=${query}`,
};
