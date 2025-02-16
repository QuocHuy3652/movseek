'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  isSearchPage: boolean;
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-200 hover:text-gray-900"
    >
      {label}
    </Link>
  );
}

const Header = ({ showSearch, setShowSearch, isSearchPage }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="px-4 py-3 bg-primary">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-end gap-20">
          <div
            className="text-2xl font-bold cursor-pointer select-none bg-gradient-to-l from-white via-indigo-300 to-red-200 text-transparent bg-clip-text"
            onClick={() => router.push('/')}
          >
            MovSeek
          </div>

          <nav className="flex space-x-5 text-white text-lg font-medium">
            <div className="relative group">
              <Link
                href="#"
                className="hover:underline"
              >
                Movies
              </Link>
              <div className="absolute z-30 left-0 -translate-x-10 hidden w-48 bg-white text-gray-800 rounded-lg shadow-lg group-hover:block">
                <DropdownItem
                  href="/movie/popular"
                  label="Popular"
                />
                <DropdownItem
                  href="/movie/now-playing"
                  label="Now Playing"
                />
                <DropdownItem
                  href="/movie/upcoming"
                  label="Upcoming"
                />
                <DropdownItem
                  href="/movie/top-rated"
                  label="Top Rated"
                />
              </div>
            </div>

            <div className="relative group">
              <Link
                href="#"
                className="hover:underline"
              >
                TV Shows
              </Link>
              <div className="absolute z-30 left-0 -translate-x-10 hidden w-48 bg-white text-gray-800 rounded-lg shadow-lg group-hover:block">
                <DropdownItem
                  href="/tv/popular"
                  label="Popular"
                />
                <DropdownItem
                  href="/tv/airing-today"
                  label="Airing Today"
                />
                <DropdownItem
                  href="/tv/on-the-air"
                  label="On TV"
                />
                <DropdownItem
                  href="/tv/top-rated"
                  label="Top Rated"
                />
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/person"
                className="hover:underline"
              >
                People
              </Link>
            </div>

            <div className="relative group">
              <Link
                href="#"
                className="hover:underline"
              >
                More
              </Link>
              <div className="absolute z-30 left-0 -translate-x-10 hidden w-48 bg-white text-gray-800 rounded-lg shadow-lg group-hover:block">
                <DropdownItem
                  href="/favorites"
                  label="Favorites"
                />
                <DropdownItem
                  href="/watchlists"
                  label="Watchlists"
                />
                <DropdownItem
                  href="/rating-list"
                  label="Rating list"
                />
              </div>
            </div>

            <div className="relative group border border-white rounded-md px-1 hover:bg-white hover:text-primary">
              <Link
                href="/llm-finder"
                // className="hover:underline"
              >
                LLM Finder
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`)}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {isSearchPage ? (
            <div className="rounded-full text-white hover:text-gray-300 hover:cursor-pointer w-fit p-2">
              <Search />
            </div>
          ) : (
            <div
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full text-white hover:text-gray-300 hover:cursor-pointer w-fit p-2"
            >
              {showSearch ? <X /> : <Search />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
