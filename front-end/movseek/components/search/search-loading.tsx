import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="w-4/5">
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
        <Skeleton className="relative w-full h-80 font-geist overflow-hidden bg-gray-100 rounded-lg shadow hover:shadow-lg transition"></Skeleton>
      </div>
    </div>
  );
};

export default Loading;
