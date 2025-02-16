'use client';

import { useParams } from 'next/navigation';
import { TMDB_API } from '@/constants/constants';
import { useEffect, useState } from 'react';
import type { Credits, Keyword, Video } from '@/models/movie-detail-types';
import { handleMovieCredits, selectPreferredVideo } from '@/utils/detail-page';
import { Button } from '@/components/ui/button';
import CastList from '@/components/movie/cast-list';
import MainMovieInformationDummy from '@/components/movie/main-movie-information-dummy';
import Trailer from '@/components/movie/trailer';
import { TV } from '@/models/tv-detail-types';
import AltTVInformation from '@/components/tv/alt-tv-information';
import MainTVInformation from '@/components/tv/main-tv-information';
import { fetchTVDetail, fetchTVCredits, fetchTVKeywords, fetchTVVideos } from '@/apis/tv';
import RecommendationList from '@/components/tv/recommendations';
import { useUser } from '@clerk/nextjs';
import ReviewsAndRating from '@/components/tv/reviews-and-rating';

export default function TVDetail() {
  const params = useParams();
  const { id } = params;
  const { isSignedIn, user } = useUser();
  const [imageSrc, setImageSrc] = useState('/poster-default.svg');
  const [transitioning, setTransitioning] = useState(false);
  const [transitioningCast, setTransitioningCast] = useState(false);
  const [transitioningRecommendation, setTransitioningRecommendation] = useState(false);
  const [idTV, setIdTV] = useState<number>(0);
  const [tv, setTV] = useState<TV | null>(null);
  const [creadits, setCredits] = useState<Credits | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDisplayFullCastAndCrew, setIsDisplayFullCastAndCrew] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVideo = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (id) {
      const numericId = +id;
      setIdTV(numericId);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tvResponse = await fetchTVDetail(idTV);
        const data = tvResponse.data.data;
        setImageSrc(TMDB_API.POSTER(data.poster_path));
        setTV(data);

        const creditsResponse = await fetchTVCredits(idTV);
        setCredits(handleMovieCredits(creditsResponse.data));

        const keywordsResponde = await fetchTVKeywords(idTV);
        setKeywords(keywordsResponde.data.results);

        const videoResponse = await fetchTVVideos(idTV);
        setVideos(videoResponse.data.results);
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

    if (idTV > 0) {
      fetchData();
    }
  }, [idTV]);

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
      {tv !== null && creadits != null && !loading && imageSrc != '/poster-default.svg' ? (
        <div className="font-geist-mono">
          <MainTVInformation
            tv={tv}
            creadits={creadits}
            hasTrailer={videos.length > 0}
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
                  tv={tv}
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
                </div>
                <div
                  className={`transition-opacity duration-500 ${
                    transitioningRecommendation ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <RecommendationList
                    baseOn={'genres'}
                    setTransitioning={setTransitioningRecommendation}
                    tv={tv}
                    keywords={keywords}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/5">
              <AltTVInformation
                tv={tv}
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
}
