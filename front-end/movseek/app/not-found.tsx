import { Button } from '@/components/ui/button';
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-primary text-white">
      <div className="text-center">
        <div className="flex items-center">
          <h1 className="text-4xl pe-4 border-r-2 mr-4">404</h1>
          <p className="text-lg">This page could not be found.</p>
        </div>
        <Link href="/">
          <Button variant="secondary" className="mt-6">
            <CircleChevronLeft /> Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
