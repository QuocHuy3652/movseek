import React from 'react';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const colors = {
    success: {
      active: '#4caf50',
      inactive: '#29432c',
    },
    warning: {
      active: '#d3d553',
      inactive: '#2f321b',
    },
    danger: {
      active: '#be365d',
      inactive: '#501934',
    },
    nr: {
      active: '#666666',
      inactive: '#666666',
    },
  };
  const categorize = (rating: number) => {
    if (rating >= 7) {
      return colors.success;
    } else if (rating >= 5) {
      return colors.warning;
    } else if (rating > 0) {
      return colors.danger;
    } else {
      return colors.nr;
    }
  };

  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${categorize(rating).active} ${rating * 10}%, ${categorize(rating).inactive} ${
            rating * 10
          }%)`,
        }}
      ></div>
      <div className="absolute inset-1 bg-gray-800 rounded-full"></div>
      <span className="absolute text-white text-lg font-bold">{rating > 0 ? `${Math.round(rating * 10)}%` : 'NR'}</span>
    </div>
  );
};

export default Rating;
