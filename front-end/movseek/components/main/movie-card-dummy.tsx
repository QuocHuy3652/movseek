import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

const MovieCardDummpy: React.FC = () => {
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full h-full bg-white font-geist shadow-lg rounded-lg transition-opacity duration-500 ${
        transitioning ? 'opacity-40' : 'opacity-70'
      } overflow-hidden hover:shadow-xl`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src="/poster-default.svg"
              alt="loading..."
              className="w-full h-60 object-contain hover:cursor-pointer"
              width="400"
              height={400 * 1.618}
            />
          </TooltipTrigger>
          <TooltipContent>loading...</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="absolute bottom-16 left-4 flex items-center justify-center w-10 h-10 rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#666666 0%, #666666 0%)`,
          }}
        ></div>
        <div className="absolute inset-1 bg-gray-800 rounded-full"></div>
        <span className="absolute text-white text-xs font-bold">NR</span>
      </div>

      <div className="absolute top-3/4 bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent px-2 py-5">
        <h3 className="text-xs text-white font-bold line-clamp-2 hover:text-primary hover:cursor-pointer"></h3>
        <p className="text-xs text-white"></p>
      </div>
    </div>
  );
};

export default MovieCardDummpy;
