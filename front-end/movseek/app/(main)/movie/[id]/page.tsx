'use client';

import { useParams } from 'next/navigation';
import { TMDB_API } from '@/constants/constants';
import { useEffect, useRef, useState } from 'react';
import { fetchMovieCredits, fetchMovieDetail, fetchMovieKeywords, fetchMovieVideos } from '@/apis/movie';
import type { Movie, Credits, Keyword, Video } from '@/models/movie-detail-types';
import { pickMovieFields, handleMovieCredits, selectPreferredVideo } from '@/utils/detail-page';
import { Button } from '@/components/ui/button';
import MainMovieInformation from '@/components/movie/main-movie-information';
import CastList from '@/components/movie/cast-list';
import AltMovieInformation from '@/components/movie/alt-movie-information';
import MainMovieInformationDummy from '@/components/movie/main-movie-information-dummy';
import Trailer from '@/components/movie/trailer';
import RecommendationList from '@/components/movie/recommendations';
import ReviewsAndRating from '@/components/movie/reviews-and-rating';
import { useUser } from '@clerk/nextjs';

const MovieDetail = () => {
  const params = useParams();
  const { id } = params;
  const { isSignedIn, user } = useUser();
  const [imageSrc, setImageSrc] = useState('/poster-default.svg');
  const [transitioning, setTransitioning] = useState(false);
  const [transitioningCast, setTransitioningCast] = useState(false);
  const [transitioningRecommendation, setTransitioningRecommendation] = useState(false);
  const [idMovie, setIdMovie] = useState<number>(0);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [creadits, setCredits] = useState<Credits | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDisplayFullCastAndCrew, setIsDisplayFullCastAndCrew] = useState<boolean>(false);
  const [viewModeRecommendation, setViewModeRecommendation] = useState<'genres' | 'vectors-search'>('genres');
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const buttonARef = useRef<HTMLButtonElement>(null);
  const buttonBRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVideo = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (id) {
      const numericId = +id;
      setIdMovie(numericId);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetchMovieDetail(idMovie);
        const data = pickMovieFields(movieResponse.data.data);
        setImageSrc(TMDB_API.POSTER(data.poster_path));
        setMovie(data);

        const creditsResponse = await fetchMovieCredits(idMovie);
        setCredits(handleMovieCredits(creditsResponse.data.data));

        const keywordsResponde = await fetchMovieKeywords(idMovie);
        setKeywords(keywordsResponde.data.data);

        const videoResponse = await fetchMovieVideos(idMovie);
        setVideos(videoResponse.data.data);
      } catch (err) {
        setError('Failed to fetch movie detail');
        console.log(err);
      } finally {
        setTransitioning(true);
        setTimeout(() => {
          setLoading(false);
          setTransitioning(false);
        }, 500);
      }
    };

    if (idMovie > 0) {
      fetchData();
    }
  }, [idMovie]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleModeChangeCast = (mode: boolean) => {
    if (mode !== isDisplayFullCastAndCrew) {
      setTransitioningCast(true);
      setTimeout(() => {
        setIsDisplayFullCastAndCrew(mode);
        setTransitioningCast(false);
      }, 300);
    }
  };

  useEffect(() => {
    const activeRef = viewModeRecommendation === 'genres' ? buttonARef.current : buttonBRef.current;
    if (activeRef) {
      const rect = activeRef.getBoundingClientRect();
      setBackgroundStyle({
        width: `${rect.width}px`,
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [viewModeRecommendation]);

  const handleModeChangeRecommendation = (mode: 'genres' | 'vectors-search') => {
    if (mode !== viewModeRecommendation) {
      setViewModeRecommendation(mode);
    }
  };

  if (error)
    return (
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Uh-oh! Something went wrong. Please try later!!!</h1>
    );

  return (
    <div className={`relative transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
      {isVisible && (
        <Trailer
          videoId={selectPreferredVideo(videos).key}
          toggleVideo={toggleVideo}
        />
      )}
      {movie !== null && creadits != null && !loading && imageSrc != '/poster-default.svg' ? (
        <div className="font-geist-mono">
          <MainMovieInformation
            movie={movie}
            creadits={creadits}
            hasTrailer={videos && videos?.length > 0}
            toggleVideo={toggleVideo}
            isSignedIn={isSignedIn ?? false}
            user_id={user?.id ?? ''}
          />

          <div className="flex gap-6 container mx-auto mt-5 py-10">
            <div className={`relative w-4/5`}>
              <div className={`transition-opacity duration-300 ${transitioningCast ? 'opacity-0' : 'opacity-100'}`}>
                {creadits.cast.length >= 6 && (
                  <div className="flex justify-between">
                    {!isDisplayFullCastAndCrew && <h2 className="text-2xl font-bold mb-4">Top Billed Cast</h2>}
                    <div></div>
                    <Button
                      onClick={() => handleModeChangeCast(!isDisplayFullCastAndCrew)}
                      className="text-xl border border-gray-400"
                      variant="outline"
                    >
                      {isDisplayFullCastAndCrew ? 'View less' : 'View Full Cast & Crew'}
                    </Button>
                  </div>
                )}
                <CastList
                  credits={creadits}
                  isfull={isDisplayFullCastAndCrew}
                />
              </div>
              <hr className="my-14 border-t border-gray-300" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Reviews And Rating</h2>
                <ReviewsAndRating
                  movie={movie}
                  isSignedIn={isSignedIn ?? false}
                  user_id={user?.id ?? ''}
                  avatar={user?.imageUrl ?? ''}
                  username={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}
                />
              </div>
              <hr className="my-14 border-t border-gray-300" />
              <div>
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                  <div className="relative items-center bg-white border-2 border-blue-500 mb-6 rounded-full w-fit">
                    <div
                      className="absolute h-9 w-[165.33px] z-0 top-0 left-0 bg-blue-500 rounded-full border-white border transition-all duration-300 ease-in-out"
                      style={backgroundStyle}
                    ></div>
                    <button
                      ref={buttonARef}
                      onClick={() => handleModeChangeRecommendation('genres')}
                      className={`relative z-10 px-4 text-sm py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
                        viewModeRecommendation === 'genres' ? 'text-white' : 'text-black opacity-60'
                      }`}
                    >
                      Base on genres
                    </button>
                    <button
                      ref={buttonBRef}
                      onClick={() => handleModeChangeRecommendation('vectors-search')}
                      className={`relative z-10 px-4 text-sm py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
                        viewModeRecommendation === 'vectors-search' ? 'text-white' : 'text-black opacity-60'
                      }`}
                    >
                      Base on vectors search
                    </button>
                  </div>
                </div>
                <div
                  className={`transition-opacity duration-500 ${
                    transitioningRecommendation ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <RecommendationList
                    baseOn={viewModeRecommendation}
                    setTransitioning={setTransitioningRecommendation}
                    movie={movie}
                    keywords={keywords}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/5">
              <AltMovieInformation
                movie={movie}
                keywords={keywords}
              />
            </div>
          </div>
        </div>
      ) : (
        <MainMovieInformationDummy />
      )}
    </div>
  );
};

export default MovieDetail;
