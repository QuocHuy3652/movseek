import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import FavoritesPage from '@/components/favorites/favorites-page';

const Favorites = async () => {
  const user = await currentUser();

  return <FavoritesPage user={JSON.parse(JSON.stringify(user))} />;
};

export default Favorites;
