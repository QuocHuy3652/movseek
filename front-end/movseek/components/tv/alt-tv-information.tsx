import type { Keyword } from '@/models/movie-detail-types';
import { Link2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TV } from '@/models/tv-detail-types';

interface AltTVInformationProps {
  tv: TV;
  keywords: Keyword[];
}

const AltTVInformation: React.FC<AltTVInformationProps> = ({ tv, keywords }) => {
  return (
    <div className="flex flex-col gap-8 mx-5 mt-20">
      {tv.homepage && tv.homepage != '' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={tv.homepage}
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
        <div>{tv.status}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Original Language</h1>
        <div>{tv.original_language}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Number Of Episodes</h1>
        <div>{tv.number_of_episodes} </div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Number Of Seasons</h1>
        <div>{tv.number_of_seasons}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">
          Keywords <span className="font-normal text-gray-500">{keywords.length}</span>
        </h1>
        {keywords.map((keyword) => (
          <Button
            key={keyword.id}
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

export default AltTVInformation;
