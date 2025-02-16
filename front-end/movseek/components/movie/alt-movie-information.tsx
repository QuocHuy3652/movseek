import type { Keyword, Movie } from '@/models/movie-detail-types';
import { formatCurrency } from '@/utils/detail-page';
import { Link2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AltMovieInformationProps {
  movie: Movie;
  keywords: Keyword[];
}

const AltMovieInformation: React.FC<AltMovieInformationProps> = ({ movie, keywords }) => {
  return (
    <div className="flex flex-col gap-8 mx-5 mt-20">
      {movie.homepage && movie.homepage != '' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit"
              >
                <div className="hover:bg-gray-100 hover:cursor-pointer w-fit p-2 rounded-sm">
                  <Link2 className="w-8 h-8" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Visit Homepage</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div>
        <h1 className="font-bold text-lg">Status</h1>
        <div>{movie.status}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Original Language</h1>
        <div>{movie.original_language}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Budget</h1>
        <div>{movie.budget ? formatCurrency(movie.budget) : '-'} </div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Revenue</h1>
        <div>{movie.revenue ? formatCurrency(movie.budget) : '-'}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">
          Keywords <span className="font-normal text-gray-500">{keywords.length}</span>
        </h1>
        {keywords.map((keyword, index) => (
          <Button
            key={index}
            variant="secondary"
            className="mr-2 mt-2 border text-xs border-black"
          >
            {keyword.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AltMovieInformation;
