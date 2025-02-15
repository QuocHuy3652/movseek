import React, { useState } from 'react';
import Image from 'next/image';
import { TMDB_API } from '@/utils/constants';

interface CastAndCrewImageProps {
  image: string;
  name: string;
  gender: number;
}

const CastAndCrewImage: React.FC<CastAndCrewImageProps> = ({ image, name, gender }) => {
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(image));

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md">
      <Image
        className=" hover:cursor-pointer"
        src={image ? imageSrc : gender == 1 ? '/default-female-avatar.svg' : '/default-male-avatar.svg'}
        alt={name}
        layout="fill"
        style={{ objectFit: 'cover' }}
        onError={() => setImageSrc(gender == 1 ? '/default-female-avatar.svg' : '/default-male-avatar.svg')}
      />
    </div>
  );
};

export default CastAndCrewImage;
