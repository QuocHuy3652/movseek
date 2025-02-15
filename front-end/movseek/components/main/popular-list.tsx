'use client';

import { useEffect, useRef, useState } from 'react';
import MovieCard from '@/components/main/movie-card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import MovieCardDummpy from '@/components/main/movie-card-dummy';
import { fetchMoviePopular } from '@/apis/movie-list';
import { fetchTVPopular } from '@/apis/tv-list';
import TVCard from '@/components/main/tv-card';

interface PopularListProps {
  popularType: 'theaters' | 'tv-series';
}

interface Movie {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  rating: number;
}

const PopularList = ({ popularType }: PopularListProps) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [transitioning, setTransitioning] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const buttonARef = useRef<HTMLButtonElement>(null);
  const buttonBRef = useRef<HTMLButtonElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        if (popularType == 'theaters') {
          const response = await fetchMoviePopular(1, '');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = response.data.data.results.map((movie: Record<string, any>) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
          }));
          setMovies(data);
        } else {
          const response = await fetchTVPopular(1, '');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data = response.data.data.results.map((tv: Record<string, any>) => ({
            id: tv.id,
            title: tv.name,
            poster: tv.poster_path,
            releaseDate: tv.first_air_date,
            rating: tv.vote_average,
          }));
          setMovies(data);
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

    fetchPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularType]);

  useEffect(() => {
    const activeRef = viewMode === 'carousel' ? buttonARef.current : buttonBRef.current;
    if (activeRef) {
      const rect = activeRef.getBoundingClientRect();
      setBackgroundStyle({
        width: `${rect.width}px`,
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [viewMode]);

  const handleModeChange = (mode: 'carousel' | 'grid') => {
    if (mode !== viewMode) {
      setTransitioning(true);
      setTimeout(() => {
        setViewMode(mode);
        setTransitioning(false);
      }, 500);
    }
  };

  const moviesDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="relative w-full py-4">
      <div className="flex justify-end">
        <div className="relative items-center bg-white border-2 border-blue-500 mb-6 rounded-full w-fit">
          <div
            className="absolute h-9 w-[165.33px] z-0 top-0 left-0 bg-blue-500 rounded-full border-white border transition-all duration-300 ease-in-out"
            style={backgroundStyle}
          ></div>
          <button
            ref={buttonARef}
            onClick={() => handleModeChange('carousel')}
            className={`relative z-10 px-4 text-sm py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
              viewMode === 'carousel' ? 'text-white' : 'text-black opacity-60'
            }`}
          >
            View in Carousel
          </button>
          <button
            ref={buttonBRef}
            onClick={() => handleModeChange('grid')}
            className={`relative z-10 px-4 text-sm py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
              viewMode === 'grid' ? 'text-white' : 'text-black opacity-60'
            }`}
          >
            View in Grid
          </button>
        </div>
      </div>
      <div className={`relative transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {viewMode === 'carousel' ? (
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <div className="flex space-x-8">
              <CarouselContent>
                {loading
                  ? moviesDummy.map((movie, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-44 h-80"
                      >
                        <MovieCardDummpy />
                      </CarouselItem>
                    ))
                  : movies.map((movie, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-44 h-80"
                      >
                        {popularType == 'theaters' ? (
                          <MovieCard
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            releaseDate={movie.releaseDate}
                            rating={movie.rating}
                          />
                        ) : (
                          <TVCard
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            releaseDate={movie.releaseDate}
                            rating={movie.rating}
                          />
                        )}
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
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="h-80"
              >
                {popularType == 'theaters' ? (
                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster={movie.poster}
                    releaseDate={movie.releaseDate}
                    rating={movie.rating}
                  />
                ) : (
                  <TVCard
                    id={movie.id}
                    title={movie.title}
                    poster={movie.poster}
                    releaseDate={movie.releaseDate}
                    rating={movie.rating}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularList;
