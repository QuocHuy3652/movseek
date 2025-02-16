import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TMDB_API } from '@/constants/constants';
import Link from 'next/link';

interface TVCardProps {
  id: number;
  title: string;
  releaseDate: string;
  poster: string;
  rating: number;
}

const TVCard: React.FC<TVCardProps> = ({ id, title, releaseDate, poster, rating }) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(poster));
  const colors = {
    success: {
      active: '#4caf50',
      inactive: '#29432c',
    },
    warning: {
      active: '#d3d553',
      inactive: '#2f321b',
    },
    danger: {
      active: '#be365d',
      inactive: '#501934',
    },
    nr: {
      active: '#666666',
      inactive: '#666666',
    },
  };
  const categorize = (rating: number) => {
    if (rating >= 7) {
      return colors.success;
    } else if (rating >= 5) {
      return colors.warning;
    } else if (rating > 0) {
      return colors.danger;
    } else {
      return colors.nr;
    }
  };

  return (
    <div className="relative w-full h-full bg-white font-geist shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href={`/tv/${id}`}>
              <Image
                src={poster ? imageSrc : '/poster-default.svg'}
                alt={title}
                className="w-full h-60 object-cover hover:cursor-pointer"
                width={400}
                height={400 * 1.618}
                onError={() => setImageSrc('/poster-default.svg')}
                priority
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="absolute bottom-16 left-4 flex items-center justify-center w-10 h-10 rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${categorize(rating).active} ${rating * 10}%, ${categorize(rating).inactive} ${
              rating * 10
            }%)`,
          }}
        ></div>
        <div className="absolute inset-1 bg-gray-800 rounded-full"></div>
        <span className="absolute text-white text-xs font-bold">
          {rating > 0 ? `${Math.round(rating * 10)}%` : 'NR'}
        </span>
      </div>

      <div className="absolute top-3/4 bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent px-2 py-5">
        <Link href={`/tv/${id}`}>
          <h3 className="text-xs text-white font-bold line-clamp-2 hover:text-primary hover:cursor-pointer">{title}</h3>
        </Link>
        <p className="text-xs text-white">{releaseDate != '' ? formatDate(releaseDate) : ''}</p>
      </div>
    </div>
  );
};

export default TVCard;
