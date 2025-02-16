import React, { useState } from 'react';
import Image from 'next/image';
import { TMDB_API } from '@/constants/constants';
import type { PeopleCredit } from '@/models/people-types';
import Link from 'next/link';

interface KnownForCardProps {
  knownFor: PeopleCredit;
}

const KnownForCard: React.FC<KnownForCardProps> = ({ knownFor }) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(knownFor.poster_path));

  return (
    <div className="relative w-full h-full bg-white font-geist shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={'title' in knownFor ? `/movie/${knownFor.id}` : '#'}>
        <Image
          src={knownFor.poster_path ? imageSrc : '/poster-default.svg'}
          alt={'title' in knownFor ? knownFor.title : knownFor.name}
          className="w-full h-60 object-cover hover:cursor-pointer"
          width={400}
          height={400 * 1.618}
          onError={() => setImageSrc('/poster-default.svg')}
          priority
        />
      </Link>

      <div className="absolute text-center top-3/4 bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent px-2 py-5">
        <Link href={'title' in knownFor ? `/movie/${knownFor.id}` : '#'}>
          <h3 className="text-sm text-white font-bold line-clamp-2 hover:text-primary hover:cursor-pointer">
            {'title' in knownFor ? knownFor.title : knownFor.name}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default KnownForCard;
