import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TMDB_API } from '@/constants/constants';
import Link from 'next/link';
import { Movie } from '@/models/search-types';
import Rating from '@/components/favorites/rating';

interface LLMSearchCardProps {
  movie: Movie;
}

const LLMSearchCard: React.FC<LLMSearchCardProps> = ({ movie }) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(movie.poster_path));

  return (
    <>
      <div className="flex items-start justify-start w-full rounded-lg border shadow-lg p-1 pr-7">
        <div className="w-[180px] flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={movie.poster_path ? imageSrc : '/poster-default.svg'}
                    alt={movie.title}
                    className="w-full h-56 object-cover rounded-lg hover:cursor-pointer"
                    width={400}
                    height={400 * 1.618}
                    onError={() => setImageSrc('/poster-default.svg')}
                    priority
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{movie.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col justify-between gap-5 py-3 w-5/6">
          <div className="flex justify-start items-center gap-5">
            <div className="relative w-fit h-fit">
              <Rating rating={movie.vote_average} />
            </div>
            <div>
              <Link href={`/movie/${movie.id}`}>
                <h3 className="text-base text-left hover:text-primary font-bold">{movie.title}</h3>
              </Link>
              {movie.release_date && <h3 className="text-base text-left">{formatDate(movie.release_date)}</h3>}
            </div>
          </div>
          {movie.overview && <p className="text-base text-justify">{movie.overview}</p>}
        </div>
      </div>
    </>
  );
};

export default LLMSearchCard;
