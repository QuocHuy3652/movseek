import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import WatchlistsPage from '@/components/watchlists/watchlists-page';

const Favorites = async () => {
  const user = await currentUser();

  return <WatchlistsPage user={JSON.parse(JSON.stringify(user))} />;
};

export default Favorites;
