'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MovieListResults } from '@/models/movie-list-types';
import { fetchLLMNavigate, fetchLLMRetriever } from '@/apis/llm-search';
import { fetchSearchSpecificMovie } from '@/apis/search';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import Loading from '@/app/(main)/loading';
import LLMSearchCard from '@/components/llm/llm-search-card';
import { useClerk, useUser } from '@clerk/nextjs';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Cast } from '@/models/movie-detail-types';

interface ApiResponse {
  route: 'HOME_PAGE' | 'SEARCH_PAGE' | 'CAST_PAGE' | 'MOVIE_PAGE' | 'PROFILE_PAGE' | 'GENRE_PAGE' | 'NONE';
  params: null | { keyword?: string; movie_ids?: string[]; genre_ids?: string[] };
  metadata: object | null;
  is_success: boolean;
}

export default function SearchPage() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const amountParam = searchParams.get('amount');
  const thresholdParam = searchParams.get('threshold');
  const router = useRouter();
  const { openUserProfile } = useClerk();
  const [newQuery, setNewQuery] = useState<string>(query != null ? query : '');
  const [mode, setMode] = useState<'search' | 'navigate'>(type == 'navigate' ? 'navigate' : 'search');
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState<MovieListResults | null>(null);
  const [amount, setAmount] = useState<number>(amountParam ? parseInt(amountParam) : 10);
  const [threshold, setThreshold] = useState<number>(thresholdParam ? parseFloat(thresholdParam) : 0.5);
  const [resultRouting, setResultRouting] = useState<string[] | null>(null);

  const handleApiResponse = async (response: ApiResponse): Promise<string[]> => {
    if (response.route === 'NONE') {
      return [];
    }

    switch (response.route) {
      case 'HOME_PAGE':
        return ['/'];
        break;
      case 'SEARCH_PAGE':
        if (response.params?.keyword) {
          return [`/search?query=${encodeURIComponent(response.params.keyword)}`];
        } else {
          return [];
        }
        break;
      case 'CAST_PAGE':
        if (response.params?.movie_ids && response.params.movie_ids.length > 0) {
          const results: string[] = await Promise.all(
            response.params.movie_ids.map(async (id) => {
              const movie = await fetchSearchSpecificMovie(`object_ids=${id}`, 1);
              if (movie.data.data.results && movie.data.data.results.length > 0) {
                const credits = movie.data.data.results[0].credits;
                const castIds = credits.cast.map((actor: Cast) => actor.id);
                const allIdsString = castIds.map((id: number) => `ids=${id}`).join('&');
                return `/search?type=person&${allIdsString}`;
              }
              return '';
            }),
          );
          return results.filter((element) => element != '');
        } else {
          return [];
        }
        break;
      case 'MOVIE_PAGE':
        if (response.params?.movie_ids && response.params.movie_ids.length > 0) {
          return [`/search?type=movie&${response.params.movie_ids.map((id) => `object_ids=${id}`).join('&')}`];
        } else {
          return [];
        }
        break;
      case 'GENRE_PAGE':
        if (response.params?.genre_ids && response.params.genre_ids.length > 0) {
          return [`/search?type=movie&${response.params.genre_ids.map((id) => `genre_object_ids=${id}`).join('&')}`];
        } else {
          return [];
        }
        break;
      case 'PROFILE_PAGE':
        return ['/profile'];
        break;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (query && query.trim()) {
      setNewQuery(query);
    } else {
      setNewQuery('');
    }
  }, [query]);

  useEffect(() => {
    updateUrl('type', mode);
    if (mode == 'search') {
      updateUrl('amount', `${amount}`);
      updateUrl('threshold', `${threshold}`);
    } else if (mode == 'navigate') {
      updateUrl('amount', null);
      updateUrl('threshold', null);
    }
  }, [amount, mode, threshold]);

  const handleSearch = () => {
    const trimmedQuery = newQuery.trim();
    updateUrl('query', trimmedQuery);
    if (trimmedQuery) {
      fetchData(trimmedQuery, mode, amount, threshold);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchData = async (querySearch: string, mode: 'navigate' | 'search', amount: number, threshold: number) => {
    try {
      setLoading(true);
      if (mode == 'navigate') {
        const llmResponse = await fetchLLMNavigate(querySearch);
        const result = await handleApiResponse(llmResponse.data.data);
        setResultRouting(result);
        console.log(result);
      } else if (mode == 'search') {
        const llmResponse = await fetchLLMRetriever('movies', querySearch, amount, threshold);
        const object_ids = llmResponse.data.data.result;
        const query = object_ids.map((id: string) => `object_ids=${id}`).join('&');
        if (query != '') {
          const response = await fetchSearchSpecificMovie(query, 1);
          setMovieResults(response.data.data);
        } else {
          setMovieResults({
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
          });
        }
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
    if (query) {
      fetchData(query, mode, amount, threshold);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUrl = (key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState({}, '', url);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleOpenProfile = () => {
    if (isSignedIn) {
      openUserProfile();
    } else {
      toast({
        title: 'Login Required',
        description: 'You must log in to perform this action.',
        duration: 3000,
        className: 'bg-primary text-white border border-gray-200',
        action: (
          <ToastAction
            altText="Go to login"
            className="text-primary bg-white hover:bg-gray-200 px-3 py-1 rounded-lg"
            onClick={() => {
              const params = Object.fromEntries(searchParams.entries());
              const queryString = new URLSearchParams(params).toString();
              const fullPath = `${pathname}?${queryString}`;
              router.push(`/sign-in?redirect=${encodeURIComponent(fullPath)}`);
            }}
          >
            Sign in
          </ToastAction>
        ),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-geist">
      <main className="flex gap-6 container mx-auto py-10">
        <div className="w-1/5 text-lg p-3 space-y-5">
          <div className="flex items-center gap-5">
            <Switch
              checked={mode == 'navigate'}
              onCheckedChange={() => setMode(mode == 'navigate' ? 'search' : 'navigate')}
            />
            <div className="text-base font-bold">{mode == 'navigate' ? 'AI Navigate Mode' : 'LLM Search Mode'}</div>
          </div>
          <p className="text-sm text-justify">
            {`${
              mode == 'navigate'
                ? `Navigate seamlessly with AI-powered queries. Ask questions like "Casts of Moana" and the website will take you directly to the relevant page, such as the cast listing for Moana.`
                : 'Discover movies effortlessly with natural language queries. Simply ask for movies like "Sea adventure animation films" and get curated results that match your request.'
            }`}
          </p>
          {mode == 'search' && (
            <div className="space-y-2">
              <hr />
              <div className="space-y-2">
                <h2 className="font-bold">Amount</h2>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={2}
                    max={100}
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <p className="text-sm text-justify">
                  The amount parameter determines the number of related movies to include in the results.
                </p>
              </div>
              <div className="space-y-1">
                <h2 className="font-bold">Threshold</h2>
                <div className="flex gap-2">
                  <Slider
                    value={[threshold]}
                    max={1}
                    step={0.1}
                    onValueChange={(value) => setThreshold(value[0])}
                  />
                  <Button
                    variant="default"
                    size="icon"
                    className={`rounded-full border border-gray-200 w-12 h-8`}
                  >
                    {threshold}
                  </Button>
                </div>
                <p className="text-sm text-justify">
                  The threshold parameter sets the minimum relevance score a movie must have to be considered related.
                </p>
              </div>
              <hr />
              <p className="text-sm text-justify">
                For example, if the amount is <b>5</b> and the threshold is <b>0.8</b>, the system will return up to{' '}
                <b>5</b> movies with at least <b>80%</b> similarity.
              </p>
            </div>
          )}
        </div>

        <div className={`relative w-4/5 space-y-5`}>
          <div className="relative w-full max-w-5xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 rounded-3xl top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search />
            </Button>
            <input
              type="text"
              placeholder="Type your description here..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-3 pl-12 pr-36 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg"
            />
            {newQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNewQuery('')}
                className="absolute right-24 rounded-3xl top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X />
              </Button>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 px-5 py-3 bg-gradient-to-r from-cyan-400 to-primary text-white font-geist rounded-full shadow-md transition hover:text-black"
            >
              Search
            </button>
          </div>

          <div className={`w-full transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
            {mode == 'search' ? (
              <>
                {movieResults != null && !loading ? (
                  <div className="space-y-5">
                    <div className="text-xl flex justify-end gap-5 px-2">
                      <div>Results</div>
                      <div className="text-gray-400">{movieResults.results?.length ?? 0}</div>
                    </div>
                    {movieResults.results != null && movieResults.results.length > 0 ? (
                      <div className="space-y-5">
                        {movieResults.results.map((movie, index) => (
                          <LLMSearchCard
                            key={index}
                            movie={movie}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">{`There are no result that matched your query.`}</div>
                    )}
                  </div>
                ) : loading ? (
                  <Loading />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {resultRouting && !loading ? (
                  <div className="space-y-5">
                    <div className="text-xl flex justify-end gap-5 px-2">
                      <div>Results</div>
                      <div className="text-gray-400">{resultRouting?.length ?? 0}</div>
                    </div>
                    {resultRouting.length > 0 ? (
                      <div className="space-y-5">
                        {resultRouting.map((nav, index) =>
                          nav == '/profile' ? (
                            <div
                              key={index}
                              className="flex justify-center"
                            >
                              <Button onClick={handleOpenProfile}>Open my profile</Button>
                            </div>
                          ) : (
                            <div key={index}>
                              <hr />
                              <div className="flex items-center mt-5">
                                <div className="w-1/12">Go to</div>
                                <div
                                  onClick={() => router.push(nav)}
                                  className="text-blue-600 w-11/12 hover:underline hover:cursor-pointer break-all line-clamp-2"
                                >{`${window.location.origin + nav}`}</div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="text-center">{`There are no result that matched your query.`}</div>
                    )}
                  </div>
                ) : loading ? (
                  <Loading />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
