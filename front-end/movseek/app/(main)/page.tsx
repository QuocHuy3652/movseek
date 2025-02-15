'use client';

import MovieList from '@/components/main/movie-list';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PopularList from '@/components/main/popular-list';
import LatestTrailerList from '@/components/main/latest-trailer-list';
import Trailer from '@/components/movie/trailer';

export default function Home() {
  const [activeButton, setActiveButton] = useState<'day' | 'week'>('day');
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [numberBackground] = useState<number>(Math.floor(Math.random() * 10) + 1);
  const [thumbnailBackground, setThumbnailBackground] = useState<string>(`/background-${numberBackground}.jpg`);
  const buttonARef = useRef<HTMLButtonElement>(null);
  const buttonBRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [popularType, setPopularType] = useState<'theaters' | 'tv-series'>('tv-series');
  const [isVisible, setIsVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const toggleVideo = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  useEffect(() => {
    const activeRef = activeButton === 'day' ? buttonARef.current : buttonBRef.current;
    if (activeRef) {
      const rect = activeRef.getBoundingClientRect();
      setBackgroundStyle({
        width: `${rect.width}px`,
        transform: `translateX(${activeRef.offsetLeft}px)`,
      });
    }
  }, [activeButton]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}&type=movie`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePlayVideo = (url: string) => {
    setVideoUrl(url);
    toggleVideo();
  };

  return (
    <div className="text-center italic font-geist-mono">
      <div
        className="relative py-10 px-5 shadow-lg text-center"
        style={{
          backgroundImage: `url(/background-${numberBackground}.jpg)`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
        suppressHydrationWarning
      >
        <div className="absolute z-0 inset-0 bg-black/70"></div>

        <div className="relative z-10 container mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-l from-red-500 via-primary to-red-500 text-transparent bg-clip-text mb-4">
            Welcome to MovSeek!
          </h1>
          <span className="text-lg text-white block mb-6 px-20">
            Whether you are looking for the latest blockbusters or hidden gems, MovSeek helps you find the perfect movie
            to watch. Explore personalized recommendations, search your favorite films, and dive into a world of
            cinematic adventures. Start your movie journey with us today!
          </span>
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-5xl">
              <input
                type="text"
                placeholder="Search for movie, tv show, person"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full py-3 pl-5 pr-28 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg"
              />
              <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-5 py-3 bg-gradient-to-r from-cyan-400 to-primary text-white font-geist rounded-full shadow-md transition hover:text-black"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <main className="flex-grow text-black">
          <section className="container py-6">
            <div className="flex items-center content-center">
              <h1 className="text-4xl text-start font-bold mr-14 mb-6">Trending</h1>
              <div className="relative flex items-center bg-sky-700 pr-1 mb-6 rounded-full w-fit">
                <div
                  className={`absolute h-8 w-[79.22px] top-1 ${
                    activeButton === 'day' ? 'left-1' : 'left-0'
                  } bg-gradient-to-r from-purple-400 to-sky-500 rounded-full border-white border transition-all duration-300 ease-in-out`}
                  style={backgroundStyle}
                ></div>
                <button
                  ref={buttonARef}
                  onClick={() => setActiveButton('day')}
                  className={`z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
                    activeButton === 'day' ? 'text-white' : 'text-white opacity-60'
                  }`}
                >
                  Today
                </button>
                <button
                  ref={buttonBRef}
                  onClick={() => setActiveButton('week')}
                  className={`z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
                    activeButton === 'week' ? 'text-white' : 'text-white opacity-60'
                  }`}
                >
                  This week
                </button>
              </div>
            </div>
            <MovieList
              mediaType="movie"
              timeWindow={activeButton}
            />
          </section>
        </main>
      </div>

      <div
        className="relative my-10 py-10 px-5 shadow-lg text-center"
        style={{
          backgroundImage: `url(${thumbnailBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          transition: 'background-image 0.2s ease-in-out',
        }}
        suppressHydrationWarning
      >
        <div className="absolute z-0 inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto">
          <h1 className="text-2xl text-start font-bold text-white mb-4">Latest Trailers</h1>
          <LatestTrailerList
            changeThumbnail={setThumbnailBackground}
            onPlayVideo={handlePlayVideo}
          />
        </div>
      </div>
      {isVisible && (
        <Trailer
          videoId={videoUrl}
          toggleVideo={toggleVideo}
        />
      )}

      <div className="container mx-auto">
        <main className="flex-grow text-black">
          <section className="container py-6">
            <div className="flex items-center content-center gap-7">
              <h1 className="text-2xl text-start font-bold">{`What\'s Popular`}</h1>
              <Select
                value={popularType}
                onValueChange={(value: 'tv-series' | 'theaters') => setPopularType(value)}
              >
                <SelectTrigger className="w-fit border border-black text-lg p-3 bg-sky-600 rounded-full text-white">
                  <SelectValue placeholder="Select a place" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="tv-series">In TV Series</SelectItem>
                    <SelectItem value="theaters">In Theaters</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PopularList popularType={popularType} />
          </section>
        </main>
      </div>
    </div>
  );
}
