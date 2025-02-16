import { Button } from '@/components/ui/button';
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-primary">
      <Link href="/" className="absolute left-6 top-6">
        <Button variant="secondary">
          <CircleChevronLeft /> Back Home
        </Button>
      </Link>
      <div className="my-6">{children}</div>
    </main>
  );
};

export default Layout;
