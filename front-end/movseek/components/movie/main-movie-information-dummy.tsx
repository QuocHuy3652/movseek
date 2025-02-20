import { Skeleton } from '@/components/ui/skeleton';

const MainMovieInformationDummy = () => {
  return (
    <div className="container mx-auto mt-4 xl:mt-6">
      <div className="flex gap-4 xl:gap-8">
        <div>
          <Skeleton className="w-80 xl:w-96 h-96 rounded-xl" />
        </div>
        <div className="flex-1 flex flex-col gap-4 xl:gap-8">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-20 w-4/5 rounded-xl" />
          <Skeleton className="h-6 w-4/5 rounded-xl" />
          <Skeleton className="h-6 w-4/5 rounded-xl" />
          <Skeleton className="h-4 w-3/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default MainMovieInformationDummy;
