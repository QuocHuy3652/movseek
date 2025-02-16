import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://awd-llm.azurewebsites.net',
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
  // params: {
  //   api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
