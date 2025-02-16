import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { TMDB_API } from '@/constants/constants';
import { useEffect, useState } from 'react';
import type { PeoplePopular } from '@/models/people-types';

interface PersonCardProps {
  person: PeoplePopular;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(person.profile_path));

  useEffect(() => {
    setImageSrc(TMDB_API.POSTER(person.profile_path));
  }, [person]);

  return (
    <>
      <div className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/person/${person.id}`}>
                <Image
                  src={
                    person.profile_path
                      ? imageSrc
                      : person.gender == 1
                      ? '/default-female-avatar.svg'
                      : '/default-male-avatar.svg'
                  }
                  alt={person.name}
                  className="h-60 object-cover hover:cursor-pointer"
                  style={{ objectFit: 'cover' }}
                  width={400}
                  height={400 * 1.618}
                  onError={() =>
                    setImageSrc(person.gender == 1 ? '/default-female-avatar.svg' : '/default-male-avatar.svg')
                  }
                  priority
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{person.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="absolute text-center bottom-0 translate-y-2 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/person/${person.id}`}>
                  <h3 className="text-sm text-white font-bold line-clamp-1 hover:text-primary hover:cursor-pointer">
                    {person.name}
                  </h3>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{person.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {person.known_for.length > 0 && (
            <p className="text-xs italic text-white overflow-hidden text-ellipsis line-clamp-2">
              {person.known_for.map((item) => (item.media_type === 'movie' ? item.title : item.name)).join(', ')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonCard;
