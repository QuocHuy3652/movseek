'use client';

import { useParams } from 'next/navigation';
import { TMDB_API } from '@/constants/constants';
import { useEffect, useState } from 'react';
import { fetchPeopleDetail } from '@/apis/people';
import type { Credits, PeopleDetail } from '@/models/people-types';
import Image from 'next/image';
import AltPersonInformation from '@/components/person/alt-person-information';
import MainPersonInformation from '@/components/person/main-person-information';
import DepartmentList from '@/components/person/department-list';
import MainMovieInformationDummy from '@/components/movie/main-movie-information-dummy';

const MovieDetail = () => {
  const params = useParams();
  const { id } = params;
  const [imageSrc, setImageSrc] = useState('/default-male-avatar.svg');
  const [idPerson, setIdPerson] = useState<number>(0);
  const [person, setPerson] = useState<PeopleDetail | null>(null);
  const [creadits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const numericId = +id;
      setIdPerson(numericId);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const personResponse = await fetchPeopleDetail(idPerson);
        const data: PeopleDetail = personResponse.data.data;
        setImageSrc(TMDB_API.POSTER(data.profile_path));
        setPerson(data);

        setCredits({
          movie_credits: data.movie_credits,
          tv_credits: data.tv_credits,
        });
      } catch (err) {
        setError('Failed to fetch movie detail');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (idPerson > 0) {
      fetchData();
    }
  }, [idPerson]);

  if (error)
    return (
      <h1 className="container mx-auto mt-5 font-bold text-2xl">Uh-oh! Something went wrong. Please try later!!!</h1>
    );

  return (
    <div className={``}>
      {person !== null && creadits !== null && !loading && imageSrc != '/default-male-avatar.svg' ? (
        <div className="font-geist-mono">
          <div className="flex gap-6 container mx-auto mt-5 py-10">
            <div className="w-1/5">
              <div className="relative h-[420px] aspect-[2/3] rounded-lg overflow-hidden">
                <Image
                  src={person.profile_path ? imageSrc : '/default-male-avatar.svg'}
                  alt={person.name}
                  layout="fill"
                  style={{ objectFit: 'contain' }}
                  onError={() => setImageSrc('/default-male-avatar.svg')}
                />
              </div>
              <AltPersonInformation
                person={person}
                numOfCredits={
                  creadits.movie_credits.cast.length +
                  creadits.movie_credits.crew.length +
                  creadits.tv_credits.cast.length +
                  creadits.tv_credits.crew.length
                }
              />
            </div>
            <div className={`w-4/5`}>
              <MainPersonInformation
                person={person}
                credits={creadits}
              />
              <DepartmentList
                credits={creadits}
                knownForDepartment={person.known_for_department}
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
