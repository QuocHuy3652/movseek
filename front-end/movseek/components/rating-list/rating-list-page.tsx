'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from '@clerk/nextjs/server';
import { formatTimestampWithSuffix } from '@/utils/favorites-page';
import Rating from '@/components/movie/rating';
import { MovieListResults } from '@/models/movie-list-types';
import Loading from '@/app/(main)/loading';
import FavoriteMovieCard from '@/components/favorites/favorite-movie-card';
import PaginationCustom from '@/components/favorites/pagination';
import { TVListResults } from '@/models/tv-list-types';
import FavoriteTVCard from '@/components/favorites/favorite-tv-card';
import { getFavoriteItem, getWatchlistItem } from '@/apis/saved-items';
import { fetchSearchSpecificMovie, fetchSearchSpecificTV } from '@/apis/search';
import { getRatingsByUser } from '@/apis/ratings';

interface RatinglistPageProps {
  user: User | null;
}

const isValidType = (value: string | null): value is 'movie' | 'tv' => ['movie', 'tv'].includes(value ? value : '');

const RatinglistPage: React.FC<RatinglistPageProps> = ({ user }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const type = searchParams.get('type');
  const [src, setSrc] = useState(user?.imageUrl);
  const [movieResults, setMovieResults] = useState<MovieListResults | null>(null);
  const [tvResults, setTVResults] = useState<TVListResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewAcsess, setIsNewAcsess] = useState(true);
  const [mode, setMode] = useState<'movie' | 'tv'>(isValidType(type) ? type : 'movie');
  const [transitioning, setTransitioning] = useState(false);
  const [movieFavorites, setMovieFavorites] = useState<number[]>([]);
  const [tvFavorites, setTVFavorites] = useState<number[]>([]);
  const [movieWatchlists, setMovieWatchlists] = useState<number[]>([]);
  const [tvWatchlists, setTVWatchlists] = useState<number[]>([]);
  const [ratings, setRatings] = useState<
    { created_at: string; media_id: number; rating: number; type: 'movie' | 'tv_show' }[]
  >([]);

  const calculateAverageRating = (type: 'movie' | 'tv_show') => {
    const filteredRatings = ratings.filter((rating) => rating.type === type);
    if (filteredRatings.length === 0) return null;
    const totalRating = filteredRatings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / filteredRatings.length;
  };

  const findRatingByMediaAndType = (media_id: number, type: 'movie' | 'tv_show') => {
    return ratings.find((rating) => rating.media_id === media_id && rating.type === type)?.rating || null;
  };

  const changeRating = async () => {
    const ratingsResponse = await getRatingsByUser(user?.id ?? '');
    setRatings(ratingsResponse.data.data.ratings);
  };

  const fetchData = async (page: string | null, isChangeMode: boolean) => {
    try {
      setLoading(true);
      const ratingsResponse = await getRatingsByUser(user?.id ?? '');
      setRatings(ratingsResponse.data.data.ratings);
      if (mode == 'movie' || !isChangeMode) {
        console.log('>>> ', ratingsResponse.data.data.ratings);
        if (ratingsResponse.data.data.ratings != null && ratingsResponse.data.data.ratings.length > 0) {
          const ratinglistMovieQueryString = ratingsResponse.data.data.ratings
            .filter(
              (rating: { created_at: string; media_id: number; rating: number; type: 'movie' | 'tv_show' }) =>
                rating.type == 'movie',
            )
            .map(
              (rating: { created_at: string; media_id: number; rating: number; type: 'movie' | 'tv_show' }) =>
                `ids=${rating.media_id}`,
            )
            .join('&');
          if (ratinglistMovieQueryString != '') {
            const movieRatingResponse = await fetchSearchSpecificMovie(
              ratinglistMovieQueryString,
              page != null ? parseInt(page) : 1,
            );
            setMovieResults(movieRatingResponse.data.data);
          } else {
            setMovieResults({
              results: [],
              page: 0,
              total_pages: 0,
              total_results: 0,
            });
          }
        } else {
          setMovieResults({
            results: [],
            page: 0,
            total_pages: 0,
            total_results: 0,
          });
        }
        const favoriteItemResponse = await getFavoriteItem(user?.id ?? '');
        setMovieFavorites(favoriteItemResponse.data.data.movie_id ?? []);
        const watchlistResponse = await getWatchlistItem(user?.id ?? '');
        setMovieWatchlists(watchlistResponse.data.data.movie_id ?? []);
        if (mode == 'movie') {
          setTransitioning(true);
          setTimeout(() => {
            setLoading(false);
            setTransitioning(false);
          }, 500);
        }
      }
      if (mode == 'tv' || !isChangeMode) {
        if (ratingsResponse.data.data.ratings != null && ratingsResponse.data.data.ratings.length > 0) {
          const ratinglistTVQueryString = ratingsResponse.data.data.ratings
            .filter(
              (rating: { created_at: string; media_id: number; rating: number; type: 'movie' | 'tv_show' }) =>
                rating.type == 'tv_show',
            )
            .map(
              (rating: { created_at: string; media_id: number; rating: number; type: 'movie' | 'tv_show' }) =>
                `ids=${rating.media_id}`,
            )
            .join('&');
          if (ratinglistTVQueryString != '') {
            const tvRatingResponse = await fetchSearchSpecificTV(
              ratinglistTVQueryString,
              page != null ? parseInt(page) : 1,
            );
            setTVResults(tvRatingResponse.data.data);
          } else {
            setTVResults({
              results: [],
              page: 0,
              total_pages: 0,
              total_results: 0,
            });
          }
        } else {
          setTVResults({
            results: [],
            page: 0,
            total_pages: 0,
            total_results: 0,
          });
        }
        const favoriteItemResponse = await getFavoriteItem(user?.id ?? '');
        setTVFavorites(favoriteItemResponse.data.data.tv_show_id ?? []);
        const watchlistResponse = await getWatchlistItem(user?.id ?? '');
        setTVWatchlists(watchlistResponse.data.data.tv_show_id ?? []);
        if (mode == 'tv') {
          setTransitioning(true);
          setTimeout(() => {
            setLoading(false);
            setTransitioning(false);
          }, 500);
        }
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      if (isChangeMode) {
        setTransitioning(true);
        setTimeout(() => {
          setLoading(false);
          setTransitioning(false);
        }, 500);
      }
    }
  };

  useEffect(() => {
    fetchData(page, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const updateUrl = (key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
  };

  // Gọi hàm khi mode thay đổi
  useEffect(() => {
    if (!isNewAcsess) {
      updateUrl('type', mode);
      updateUrl('page', null);
      fetchData('1', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleChangeMode = (newMode: 'movie' | 'tv') => {
    if (mode != newMode) {
      setIsNewAcsess(false);
      setMode(newMode);
    }
  };

  if (isError)
    return (
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Uh-oh! Something went wrong. Please try later!!!</h1>
    );

  return (
    <div className="text-center font-geist">
      <div className="relative py-10 px-5 shadow-lg bg-indigo-500 text-center">
        <div className="absolute z-0 inset-0 bg-black/70"></div>
        <div className="relative flex items-center gap-10 z-10 container mx-auto">
          <Image
            src={src ? src : '/poster-default.svg'}
            alt={user?.firstName || 'Avatar'}
            className="w-40 h-40 rounded-full my-4"
            width={400}
            height={400 * 1.618}
            onError={() => setSrc('/poster-default.svg')}
            priority
          />
          <div className="flex flex-col gap-5 text-white">
            <div className="flex gap-5 items-end">
              <div className="text-4xl font-bold">{`${user?.firstName} ${user?.lastName}`}</div>
              <div className="text-xl text-gray-200">{`Member since ${formatTimestampWithSuffix(
                user?.lastActiveAt,
              )}`}</div>
            </div>
            <div className="flex gap-8 items-center">
              <div className="relative w-fit">
                <Rating rating={calculateAverageRating('movie') ?? 0} />
              </div>
              <div className="flex flex-col items-start text-lg font-bold mr-4">
                <div>Average</div>
                <div>Movie Score</div>
              </div>
              <div className="border-l-2 border-white h-14 mx-2"></div>
              <div className="relative w-fit">
                <Rating rating={calculateAverageRating('tv_show') ?? 0} />
              </div>
              <div className="flex flex-col items-start text-lg font-bold mr-4">
                <div>Average</div>
                <div>TV Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <main className="flex-grow text-black">
          <section className="container py-6">
            <div className="flex justify-between items-end content-center py-3 mb-5">
              <div className="flex items-start content-center gap-10">
                <h1 className="text-4xl text-start font-bold mr-14">My Rating List</h1>
                <div
                  className={`hover:cursor-pointer flex items-end gap-4 ${
                    mode == 'movie' && 'border-b-4 border-primary'
                  }`}
                  onClick={() => handleChangeMode('movie')}
                >
                  <div className="text-2xl">Movies</div>
                  <div className="text-lg text-primary">{movieResults?.total_results}</div>
                </div>
                <div
                  className={`hover:cursor-pointer flex items-end gap-4 ${mode == 'tv' && 'border-b-4 border-primary'}`}
                  onClick={() => handleChangeMode('tv')}
                >
                  <div className="text-2xl">TV Series</div>
                  <div className="text-lg text-primary">{tvResults?.total_results}</div>
                </div>
              </div>
            </div>
            <div className={`relative transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
              {mode == 'movie' ? (
                <div className="flex flex-col gap-7">
                  <>
                    {movieResults != null && !loading ? (
                      movieResults.results.length > 0 ? (
                        <>
                          <>
                            {movieResults.results.map((movie, index) => (
                              <FavoriteMovieCard
                                key={index}
                                movie={movie}
                                isFavorite={movieFavorites.includes(movie.id)}
                                isWatchlist={movieWatchlists.includes(movie.id)}
                                rated={findRatingByMediaAndType(movie.id, 'movie')}
                                user_id={user?.id ?? ''}
                                avatar={user?.imageUrl ?? ''}
                                username={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}
                                changeRating={changeRating}
                                changeItem={() => {}}
                              />
                            ))}
                          </>
                          {movieResults.total_pages > 1 && (
                            <PaginationCustom
                              currentPage={page != null ? parseInt(page) : 1}
                              totalPage={movieResults.total_pages}
                              type={mode}
                              endpoint="/rating-list"
                            />
                          )}
                        </>
                      ) : (
                        <div>{`You haven't rated any movies.`}</div>
                      )
                    ) : (
                      <Loading />
                    )}
                  </>
                </div>
              ) : (
                <div className="flex flex-col gap-7">
                  <>
                    {tvResults != null && !loading ? (
                      tvResults.results.length > 0 ? (
                        <>
                          <>
                            {tvResults.results.map((tv, index) => (
                              <FavoriteTVCard
                                key={index}
                                tv={tv}
                                isFavorite={tvFavorites.includes(tv.id)}
                                isWatchlist={tvWatchlists.includes(tv.id)}
                                rated={findRatingByMediaAndType(tv.id, 'tv_show')}
                                user_id={user?.id ?? ''}
                                avatar={user?.imageUrl ?? ''}
                                username={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}
                                changeRating={changeRating}
                                changeItem={() => {}}
                              />
                            ))}
                          </>
                          {tvResults.total_pages > 1 && (
                            <PaginationCustom
                              currentPage={page != null ? parseInt(page) : 1}
                              totalPage={tvResults.total_pages}
                              type={mode}
                              endpoint="/rating-list"
                            />
                          )}
                        </>
                      ) : (
                        <div>{`You haven't rated any tv series.`}</div>
                      )
                    ) : (
                      <Loading />
                    )}
                  </>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RatinglistPage;
