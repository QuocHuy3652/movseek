import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import MovieCardDummpy from '@/components/main/movie-card-dummy';
import { TVListResults } from '@/models/tv-list-types';
import TVSearchCard from '@/components/search/tv-search-card';
import { Keyword, TV } from '@/models/tv-detail-types';
import { fetchTVPopular } from '@/apis/tv-list';

interface RecommendationListProps {
  baseOn: 'genres' | 'vectors-search';
  setTransitioning: (transition: boolean) => void;
  // genres: Genre[];
  tv: TV;
  keywords: Keyword[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ baseOn, setTransitioning, tv }) => {
  const [tvResults, setTVResults] = useState<TVListResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const genreIdsParams = tv.genres.map((genre) => `genre_ids=${genre.id}`).join('&');

  const fetchRecommendationTVs = async (baseOn: 'genres' | 'vectors-search') => {
    try {
      setLoading(true);
      if (baseOn == 'genres') {
        const response = await fetchTVPopular(1, genreIdsParams);
        setTVResults(response.data.data);
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
    fetchRecommendationTVs(baseOn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseOn]);

  const tvsDummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
            {loading || tvResults == null
              ? tvsDummy.map((tv, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-44 h-80"
                  >
                    <MovieCardDummpy />
                  </CarouselItem>
                ))
              : tvResults?.results.map((tv, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-44 h-80"
                  >
                    <TVSearchCard tv={tv} />
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
