'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  fetchSearchMovie,
  fetchSearchPerson,
  fetchSearchSpecificMovie,
  fetchSearchSpecificPerson,
  fetchSearchTV,
} from '@/apis/search';
import type { SearchMovieResults, SearchPersonResults, SearchTVResults } from '@/models/search-types';
import MovieSearchCard from '@/components/search/movie-search-card';
import PaginationCustom from '@/components/search/pagination';
import Loading from '@/components/person/person-loading';
import TVSearchCard from '@/components/search/tv-search-card';
import PersonSearchCard from '@/components/search/person-search-card';

const isValidType = (value: string | null): value is 'movie' | 'person' | 'tv' =>
  ['movie', 'person', 'tv'].includes(value ? value : '');

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');
  const type = searchParams.get('type');
  const object_ids = searchParams.getAll('object_ids');
  const genre_object_ids = searchParams.getAll('genre_object_ids');
  const ids = searchParams.getAll('ids');
  const [mode, setMode] = useState<'movie' | 'person' | 'tv'>(isValidType(type) ? type : 'movie');
  const [transitioning, setTransitioning] = useState(false);
  const [movieResults, setMovieResults] = useState<SearchMovieResults | null>(null);
  const [tvResults, setTVResults] = useState<SearchTVResults | null>(null);
  const [personResults, setPersonResults] = useState<SearchPersonResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNewAcsess, setIsNewAcsess] = useState(true);

  const fetchData = async (page: string | null, isChangeMode: boolean) => {
    try {
      setLoading(true);
      if (
        (object_ids && object_ids.length > 0) ||
        (genre_object_ids && genre_object_ids.length > 0) ||
        (ids && ids.length > 0)
      ) {
        if (mode == 'movie') {
          const data = object_ids.length > 0 ? object_ids : genre_object_ids;
          const movieResponse = await fetchSearchSpecificMovie(
            data.map((id) => `${object_ids.length > 0 ? 'object_ids' : 'genre_object_ids'}=${id}`).join('&'),
            1,
          );
          setMovieResults(movieResponse.data.data);
          if (mode == 'movie') {
            setTransitioning(true);
            setTimeout(() => {
              setLoading(false);
              setTransitioning(false);
            }, 500);
          }
        } else if (mode == 'person') {
          const personResponse = await fetchSearchSpecificPerson(ids.map((id) => `ids=${id}`).join('&'), 1);
          setPersonResults(personResponse.data.data);
          if (mode == 'person') {
            setTransitioning(true);
            setTimeout(() => {
              setLoading(false);
              setTransitioning(false);
            }, 500);
          }
        }
      } else {
        if (mode == 'movie' || !isChangeMode) {
          const movieResponse = await fetchSearchMovie(query != null ? query : '', page != null ? parseInt(page) : 1);
          setMovieResults(movieResponse.data.data);
          if (mode == 'movie') {
            setTransitioning(true);
            setTimeout(() => {
              setLoading(false);
              setTransitioning(false);
            }, 500);
          }
        }
        if (mode == 'tv' || !isChangeMode) {
          const tvResponse = await fetchSearchTV(query != null ? query : '', page != null ? parseInt(page) : 1);
          setTVResults(tvResponse.data.data);
          if (mode == 'tv') {
            setTransitioning(true);
            setTimeout(() => {
              setLoading(false);
              setTransitioning(false);
            }, 500);
          }
        }
        if (mode == 'person' || !isChangeMode) {
          const personResponse = await fetchSearchPerson(query != null ? query : '', page != null ? parseInt(page) : 1);
          setPersonResults(personResponse.data.data);
          if (mode == 'person') {
            setTransitioning(true);
            setTimeout(() => {
              setLoading(false);
              setTransitioning(false);
            }, 500);
          }
        }
      }
    } catch (err) {
      console.log(err);
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
  }, [query, page]);

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

  const handleChangeMode = (newMode: 'movie' | 'person' | 'tv') => {
    if (mode != newMode) {
      setIsNewAcsess(false);
      setMode(newMode);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-geist-mono">
      <main className="flex gap-6 container mx-auto mt-5 py-10">
        <div className="w-1/5 text-lg">
          <h2 className="mb-2 font-bold">Search Results For</h2>
          <div className="mb-6">
            <span className="italic mr-5">{`${query ? `${query}` : 'routing'}`}</span>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className={`p-4 bg-gray-100 ${
                mode == 'movie' ? 'font-bold border border-primary' : ''
              } rounded-lg shadow hover:shadow-lg transition`}
              onClick={() => handleChangeMode('movie')}
            >
              <div className="text-sm flex justify-between">
                <div>Movies</div>
                <div className="font-normal text-gray-500">
                  {movieResults == null ? '—' : movieResults.total_results}
                </div>
              </div>
            </div>
            <div
              className={`p-4 bg-gray-100 ${
                mode == 'tv' ? 'font-bold border border-primary' : ''
              } rounded-lg shadow hover:shadow-lg transition`}
              onClick={() => handleChangeMode('tv')}
            >
              <div className="text-sm flex justify-between">
                <div>TV Shows</div>
                <div className="font-normal text-gray-500">{tvResults == null ? '—' : tvResults.total_results}</div>
              </div>
            </div>
            <div
              className={`p-4 bg-gray-100 ${
                mode == 'person' ? 'font-bold border border-primary' : ''
              } rounded-lg shadow hover:shadow-lg transition`}
              onClick={() => handleChangeMode('person')}
            >
              <div className="text-sm flex justify-between">
                <div>People</div>
                <div className="font-normal text-gray-500">
                  {personResults == null ? '—' : personResults.total_results}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative w-4/5 transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          {mode == 'movie' ? (
            <>
              {movieResults != null && !loading ? (
                <>
                  {movieResults.total_results > 0 ? (
                    <div className="w-full">
                      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {movieResults.results.map((movie, index) => (
                          <MovieSearchCard
                            key={index}
                            movie={movie}
                          />
                        ))}
                      </div>
                      {movieResults.total_pages > 1 && (
                        <PaginationCustom
                          currentPage={page != null ? parseInt(page) : 1}
                          totalPage={movieResults.total_pages}
                          query={query != null ? query : ''}
                          type={mode}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="font-bold w-full text-center">There are no movies that matched your query.</div>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </>
          ) : mode == 'tv' ? (
            <>
              {tvResults != null && !loading ? (
                <>
                  {tvResults.total_results > 0 ? (
                    <div className="w-full">
                      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {tvResults.results.map((tv, index) => (
                          <TVSearchCard
                            key={index}
                            tv={tv}
                          />
                        ))}
                      </div>

                      {tvResults.total_pages > 1 && (
                        <PaginationCustom
                          currentPage={page != null ? parseInt(page) : 1}
                          totalPage={tvResults.total_pages}
                          query={query != null ? query : ''}
                          type={mode}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="font-bold w-full text-center">There are no tv series that matched your query.</div>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </>
          ) : (
            <>
              {personResults != null && !loading ? (
                <>
                  {personResults.total_results > 0 ? (
                    <div className="w-full">
                      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {personResults.results.map((person, index) => (
                          <PersonSearchCard
                            key={index}
                            person={person}
                          />
                        ))}
                      </div>

                      {personResults.total_pages > 1 && (
                        <PaginationCustom
                          currentPage={page != null ? parseInt(page) : 1}
                          totalPage={personResults.total_pages}
                          query={query != null ? query : ''}
                          type={mode}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="font-bold w-full text-center">There are no people that matched your query.</div>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
