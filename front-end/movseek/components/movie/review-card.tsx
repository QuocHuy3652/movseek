import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { Review } from '@/models/review-types';

interface ReviewCardProps {
  review: Review;
  rating: number | null;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, rating }) => {
  const [src, setSrc] = useState(review.avatar);

  return (
    <>
      <div className="w-full rounded-lg border shadow-lg px-10 pt-2 pb-5">
        <div className="w-fit flex items-center gap-5">
          <Image
            src={src ? src : '/poster-default.svg'}
            alt={review.username || 'Avatar'}
            className="w-12 h-12 rounded-full my-4"
            width={400}
            height={400 * 1.618}
            onError={() => setSrc('/poster-default.svg')}
            priority
          />
          <div>
            <div className="font-bold text-lg">A review by {review.username}</div>
            <div className="text-sm flex items-center">
              {rating && (
                <span className="text-white font-bold text-xs bg-primary-dark rounded-full mr-3 px-2 py-0.5">
                  {rating * 10}%
                </span>
              )}
              Written by <span className="font-bold mx-2">{review.username}</span> on
              <span className="italic mx-2">{formatDate(review.created_at)}</span>
            </div>
          </div>
        </div>
        <div className="mt-1 text-justify">{review.comment}</div>
      </div>
    </>
  );
};

export default ReviewCard;
