'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchPeoplePopular } from '@/apis/people';
import type { PeoplePopularResults } from '@/models/people-types';
import PersonCard from '@/components/person/person-card';
import Loading from '@/components/person/person-loading';
import PaginationCustom from '@/components/person/pagination';

export default function PersonPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [peopleResults, setPeopleResults] = useState<PeoplePopularResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const peopleResponse = await fetchPeoplePopular(page != null ? parseInt(page) : 1);
        setPeopleResults(peopleResponse.data.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (isError)
    return (
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Uh-oh! Something went wrong. Please try later!!!</h1>
    );

  return (
    <div className="flex flex-col min-h-screen font-geist-mono">
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Popular People</h1>
      <main className="flex gap-6 container mx-auto py-10">
        {peopleResults != null && !loading ? (
          <>
            {peopleResults.total_results > 0 ? (
              <div>
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {peopleResults.results.map((person, index) => (
                    <PersonCard
                      key={index}
                      person={person}
                    />
                  ))}
                </div>

                {peopleResults.total_pages > 1 && (
                  <PaginationCustom
                    currentPage={page != null ? parseInt(page) : 1}
                    totalPage={peopleResults.total_pages}
                    endpoint={'/person'}
                  />
                )}
              </div>
            ) : (
              <div className="font-bold w-4/5 text-center">There are no person to display.</div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </main>
    </div>
  );
}
