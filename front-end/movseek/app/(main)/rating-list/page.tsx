import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import RatinglistPage from '@/components/rating-list/rating-list-page';

const Favorites = async () => {
  const user = await currentUser();

  return <RatinglistPage user={JSON.parse(JSON.stringify(user))} />;
};

export default Favorites;
