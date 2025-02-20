import axiosInstanceLLM from '@/lib/axios.config.llm';
import { TMDB_API } from '@/constants/constants';

export const fetchLLMRetriever = (collection_name: string, query: string, amount: number, threshold: number) => {
  return axiosInstanceLLM.get(TMDB_API.LLM_RETRIEVER(collection_name, query, amount, threshold));
};

export const fetchLLMNavigate = (query: string) => {
  return axiosInstanceLLM.post(TMDB_API.LLM_NAVIGATE(query));
};
