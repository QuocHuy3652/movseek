'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import MovieSearchCard from '@/components/search/movie-search-card';
import Loading from '@/components/search/search-loading';
import { fetchGenresMovie, fetchMovieUpcoming } from '@/apis/movie-list';
import PaginationCustom from '@/components/movie-list/pagination';
import { FilterSortState, GenresMovieResults, MovieListResults } from '@/models/movie-list-types';
import { Button } from '@/components/ui/button';
import { buildRoute, deepEqual } from '@/utils/movie-list-page';
import SortSection from '@/components/movie-list/sort-section';
import FiltersSection from '@/components/movie-list/filters-section';
import useInitFilterSortState from '@/hooks/useInitFilterSortState';
import { useRouter } from 'next/navigation';

export default function MovieUpcomingPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const filteredParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    return params;
  }, [searchParams]);
  const router = useRouter();
  const [movieResults, setMovieResults] = useState<MovieListResults | null>(null);
  const [genreListResults, setGenreListResults] = useState<GenresMovieResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const initFilterSortState = useInitFilterSortState();

  const [filterSortState, setFilterSortState] = useState<FilterSortState>(initFilterSortState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetchMovieUpcoming(page != null ? parseInt(page) : 1, filteredParams.toString());
        setMovieResults(movieResponse.data.data);
        const genreResponse = await fetchGenresMovie();
        setGenreListResults(genreResponse.data.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filteredParams]);

  const updateFilterSort = (key: keyof FilterSortState, value: unknown) => {
    setFilterSortState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Cập nhật thuộc tính lồng nhau (nested)
  const updateNestedFilterSort = <T extends keyof FilterSortState>(
    parentKey: T,
    childKey: keyof FilterSortState[T],
    value: unknown,
  ) => {
    if (typeof filterSortState[parentKey] === 'object' && filterSortState[parentKey] !== null) {
      setFilterSortState((prev) => ({
        ...prev,
        [parentKey]: {
          ...(prev[parentKey] as Record<string, unknown>),
          [childKey]: value,
        },
      }));
    } else {
      console.error(`${parentKey} is not an object`);
    }
  };

  const handleGenreClick = (genreId: number) => {
    setFilterSortState((prevState) => {
      const newGenres = prevState.genre.includes(genreId)
        ? prevState.genre.filter((id) => id !== genreId)
        : [...prevState.genre, genreId];

      return {
        ...prevState,
        genre: newGenres,
      };
    });
  };

  const handleUserScoreChange = (newUserScore: number[]) => {
    updateNestedFilterSort('userScore', 'from', newUserScore[0]);
    updateNestedFilterSort('userScore', 'to', newUserScore[1]);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'from' | 'to') => {
    const dateValue = new Date(e.target.value);
    if (!isNaN(dateValue.getTime())) {
      if (key === 'from' && filterSortState.releaseDate.to && dateValue > filterSortState.releaseDate.to) {
        alert('The "from" date cannot be greater than the "to" date.');
        return;
      }
      if (key === 'to' && filterSortState.releaseDate.from && dateValue < filterSortState.releaseDate.from) {
        alert('The "to" date cannot be earlier than the "from" date.');
        return;
      }
      updateNestedFilterSort('releaseDate', key, dateValue);
    } else {
      updateNestedFilterSort('releaseDate', key, null);
    }
  };

  const handleFilterSort = () => {
    router.push(buildRoute('/movie/upcoming', filterSortState));
  };

  if (isError)
    return (
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Uh-oh! Something went wrong. Please try later!!!</h1>
    );

  return (
    <div className="flex flex-col min-h-screen font-geist-mono">
      <main className="container mx-auto py-10">
        <h2 className="mb-5 text-2xl font-bold ">Upcoming Movies</h2>
        <div className="flex gap-6">
          <div className="w-1/5 text-2xl">
            <div className="flex flex-col gap-8">
              <SortSection
                isOpenSort={isOpenSort}
                setIsOpenSort={setIsOpenSort}
                filterSortState={filterSortState}
                updateFilterSort={updateFilterSort}
              />
              <FiltersSection
                isOpenFilter={isOpenFilter}
                setIsOpenFilter={setIsOpenFilter}
                filterSortState={filterSortState}
                handleDateChange={handleDateChange}
                handleGenreClick={handleGenreClick}
                handleUserScoreChange={handleUserScoreChange}
                genreListResults={genreListResults}
                loading={loading}
              />
              <Button
                disabled={deepEqual(initFilterSortState, filterSortState)}
                onClick={handleFilterSort}
              >
                Search
              </Button>
            </div>
          </div>
          {movieResults != null && !loading ? (
            <>
              {movieResults.total_results > 0 ? (
                <div className="w-4/5">
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
                      endpoint={'/movie/upcoming'}
                      params={filteredParams.toString()}
                    />
                  )}
                </div>
              ) : (
                <div className="font-bold w-4/5 text-center">There are no movies to display.</div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </div>
  );
}
