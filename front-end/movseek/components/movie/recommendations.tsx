import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import MovieSearchCard from '@/components/search/movie-search-card';
import { MovieListResults } from '@/models/movie-list-types';
import { fetchMoviePopular } from '@/apis/movie-list';
import MovieCardDummpy from '@/components/main/movie-card-dummy';
import { Keyword, Movie } from '@/models/movie-detail-types';
import { buildQuery } from '@/utils/util-functions/detail-page';
import { fetchLLMRetriever } from '@/apis/llm-search';
import { fetchSearchSpecificMovie } from '@/apis/search';

interface RecommendationListProps {
  baseOn: 'genres' | 'vectors-search';
  setTransitioning: (transition: boolean) => void;
  // genres: Genre[];
  movie: Movie;
  keywords: Keyword[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ baseOn, setTransitioning, movie, keywords }) => {
  const [movieResults, setMovieResults] = useState<MovieListResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const genreIdsParams = movie.genres.map((genre) => `genre_ids=${genre.id}`).join('&');

  const fetchRecommendationMovies = async (baseOn: 'genres' | 'vectors-search') => {
    try {
      setLoading(true);
      if (baseOn == 'genres') {
        const response = await fetchMoviePopular(1, genreIdsParams);
        setMovieResults(response.data.data);
      } else {
        const llmResponse = await fetchLLMRetriever('movies', buildQuery(movie, keywords), 18, 0.5);
        const object_ids = llmResponse.data.data.result;
        const query = object_ids.map((id: string) => `object_ids=${id}`).join('&');
        const response = await fetchSearchSpecificMovie(query, 1);
        setMovieResults(response.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTransitioning(true);
      setTimeout(() => {
        setLoading(false);
        setTransitioning(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchRecommendationMovies(baseOn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseOn]);

  const moviesDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <div className="flex space-x-8">
          <CarouselContent>
            {loading || movieResults == null
              ? moviesDummy.map((movie, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-44 h-80"
                  >
                    <MovieCardDummpy />
                  </CarouselItem>
                ))
              : movieResults?.results.map((movie, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-44 h-80"
                  >
                    <MovieSearchCard movie={movie} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          {!loading && (
            <>
              <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
                <CarouselPrevious className="p-2 bg-gray-800 text-white rounded-full" />
              </div>
              <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                <CarouselNext className="p-2 bg-gray-800 text-white rounded-full" />
              </div>
            </>
          )}
        </div>
      </Carousel>
    </>
  );
};

export default RecommendationList;
