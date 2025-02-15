'use client';

import Footer from '@/components/main/footer';
import Header from '@/components/main/header';
import React, { useState, useEffect, Suspense } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchParamsWrapper = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [newQuery, setNewQuery] = useState<string>(query != null ? query : '');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (query && query.trim() && pathname === '/search') {
      setNewQuery(query);
    } else {
      setNewQuery('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = () => {
    const trimmedQuery = newQuery.trim();
    const type = searchParams.get('type');
    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}&type=${type ?? 'movie'}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative container mx-auto py-2 flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 rounded-3xl top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <Search />
      </Button>
      <input
        type="text"
        placeholder="Search for a movie, tv show, person"
        value={newQuery}
        onChange={(e) => setNewQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 pl-12 pr-14 py-2 border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {newQuery && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setNewQuery('')}
          className="absolute right-28 rounded-3xl top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </Button>
      )}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-primary text-white font-geist rounded-full shadow-md transition hover:text-black"
      >
        Search
      </button>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (pathname === '/search') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [pathname]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          isSearchPage={pathname === '/search'}
        />
      </div>
      <div className={`h-[64px] bg-primary`}></div>

      {showSearch && (
        <div
          className={`sticky h-[64px] top-[64px] z-20 flex items-center bg-white shadow-md transition-transform duration-300 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <Suspense>
            <SearchParamsWrapper />
          </Suspense>
        </div>
      )}
      <main className="min-h-[80vh] xl:min-h-[88vh]">{children}</main>
      <Footer />
    </div>
  );
}
