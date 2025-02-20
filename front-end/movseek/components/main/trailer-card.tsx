import React, { useState } from 'react';
import Image from 'next/image';
import { TMDB_API } from '@/constants/constants';
import Link from 'next/link';

interface TrailerCardProps {
  videoUrl: string;
  thumbnail: string;
  id: number;
  title: string;
  description: string;
  changeThumbnail: (thumbnail: string) => void;
  onPlayVideo: (url: string) => void;
}

const TrailerCard: React.FC<TrailerCardProps> = ({
  videoUrl,
  thumbnail,
  id,
  title,
  description,
  changeThumbnail,
  onPlayVideo,
}) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.THUMBNAIL(thumbnail));

  return (
    <div className="max-w-md mx-auto bg-transparent text-white">
      <div className="relative rounded-lg overflow-hidden w-full h-full group">
        <div
          className="w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
          onMouseEnter={() => changeThumbnail(TMDB_API.THUMBNAIL(thumbnail))}
        >
          <Image
            src={thumbnail ? imageSrc : '/poster-default.svg'}
            alt={title}
            className="w-full h-full object-cover hover:cursor-pointer"
            width={400}
            height={400}
            onError={() => setImageSrc('/poster-default.svg')}
            priority
          />
          <div
            className="absolute h-full inset-0 flex items-center justify-center"
            onClick={() => onPlayVideo(videoUrl)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-white fill-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/movie/${id}`}>
          <h2 className="text-lg font-semibold">{title}</h2>
        </Link>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TrailerCard;
