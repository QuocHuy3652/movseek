import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="container flex mx-auto mt-6">
      <div className="flex flex-col w-full space-y-3">
        <Skeleton className="h-28 w-full max-w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-16 w-4/5 max-w-full" />
          <Skeleton className="h-10 w-3/5 max-w-full" />
          <Skeleton className="h-6 w-3/5 max-w-full" />
          <Skeleton className="h-4 w-2/5 max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
