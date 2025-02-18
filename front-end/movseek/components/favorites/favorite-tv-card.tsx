import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TMDB_API } from '@/constants/constants';
import Link from 'next/link';
import Rating from '@/components/favorites/rating';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Star, CircleMinus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { addSavedItem, removeSavedItem } from '@/apis/saved-items';
import { addRating, deleteRating, updateRating } from '@/apis/ratings';
import { ToastAction } from '@/components/ui/toast';
import { MovieList } from '@/models/movie-list-types';
import { usePathname } from 'next/navigation';
import { TVList } from '@/models/tv-list-types';

interface FavoriteTVCardProps {
  tv: TVList;
  isFavorite: boolean;
  isWatchlist: boolean;
  rated: number | null;
  user_id: string;
  avatar: string;
  username: string;
  changeRating: () => void;
  changeItem: (item: MovieList | TVList) => void;
}

const FavoriteTVCard: React.FC<FavoriteTVCardProps> = ({
  tv,
  isFavorite,
  isWatchlist,
  rated,
  user_id,
  avatar,
  username,
  changeRating,
  changeItem,
}) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const [imageSrc, setImageSrc] = useState(TMDB_API.POSTER(tv.poster_path));
  const [favorite, setFavorite] = useState(isFavorite);
  const [watchlist, setwatchlist] = useState(isWatchlist);
  const [rating, setRating] = useState<number | null>(rated ? rated * 10 : null);
  const [originRating, setOriginRating] = useState<number | null>(rated ? rated * 10 : null);

  const handlClickFavorite = async (favorite: boolean) => {
    try {
      if (!favorite) {
        if (pathname != '/favorites') {
          await addSavedItem(tv.id, 'tv_show', 'favorite', user_id);
        }
      } else {
        await removeSavedItem(tv.id, 'tv_show', 'favorite', user_id);
        if (pathname == '/favorites') {
          changeItem(tv);
        }
      }
      setFavorite(!favorite);
      if (pathname == '/favorites') {
        toast({
          title: 'Success',
          description: `${tv.name} was ${favorite ? 'removed from' : 'added to'} your favourite list.`,
          duration: 3000,
          className: 'bg-green-600 text-white border border-gray-200',
          action: (
            <ToastAction
              altText="Undo"
              className="text-black bg-white hover:bg-gray-200 px-3 py-1 rounded-lg"
              onClick={async () => {
                await addSavedItem(tv.id, 'tv_show', 'favorite', user_id);
                changeItem(tv);
              }}
            >
              Undo
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: 'Success',
          description: `${tv.name} was ${favorite ? 'removed from' : 'added to'} your favourite list.`,
          duration: 3000,
          className: 'bg-green-600 text-white border border-gray-200',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        duration: 3000,
        className: 'bg-red-600 text-white border border-gray-200',
      });
      console.error(error);
    }
  };

  const handlClickWatchlist = async (watchlist: boolean) => {
    try {
      if (!watchlist) {
        if (pathname != '/watchlists') {
          await addSavedItem(tv.id, 'tv_show', 'watchlist', user_id);
        }
      } else {
        await removeSavedItem(tv.id, 'tv_show', 'watchlist', user_id);
        if (pathname == '/watchlists') {
          changeItem(tv);
        }
      }
      setwatchlist(!watchlist);

      if (pathname == '/watchlists') {
        toast({
          title: 'Success',
          description: `${tv.name} was ${watchlist ? 'removed from' : 'added to'} your watchlist.`,
          duration: 3000,
          className: 'bg-green-600 text-white border border-gray-200',
          action: (
            <ToastAction
              altText="Undo"
              className="text-black bg-white hover:bg-gray-200 px-3 py-1 rounded-lg"
              onClick={async () => {
                await addSavedItem(tv.id, 'tv_show', 'watchlist', user_id);
                changeItem(tv);
              }}
            >
              Undo
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: 'Success',
          description: `${tv.name} was ${watchlist ? 'removed from' : 'added to'} your watchlist.`,
          duration: 3000,
          className: 'bg-green-600 text-white border border-gray-200',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        duration: 3000,
        className: 'bg-red-600 text-white border border-gray-200',
      });
      console.error(error);
    }
  };

  const handlClearMyVote = async (rating: number | null) => {
    if (rating == null) {
      toast({
        title: 'Warning',
        description: `You have no reviews yet.`,
        duration: 3000,
        className: 'bg-yellow-500 text-white border border-gray-200',
      });
      return;
    }
    try {
      await deleteRating(user_id, tv.id, 'tv_show');
      setRating(null);
      setOriginRating(null);
      toast({
        title: 'Success',
        description: `Your rating has been cleared.`,
        duration: 3000,
        className: 'bg-green-600 text-white border border-gray-200',
      });
      changeRating();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        duration: 3000,
        className: 'bg-red-600 text-white border border-gray-200',
      });
      console.error(error);
    }
  };

  const handlVote = async (rating: number | null) => {
    if (rating == null) {
      toast({
        title: 'Warning',
        description: `Please rate before voting.`,
        duration: 3000,
        className: 'bg-yellow-500 text-white border border-gray-200',
      });
      return;
    }
    try {
      if (originRating == null) {
        await addRating(avatar, tv.id, rating / 10, 'tv_show', user_id, username);
      } else {
        await updateRating(avatar, rating / 10, tv.id, 'tv_show', user_id, username);
      }
      setOriginRating(rating);
      toast({
        title: 'Success',
        description: `Your rating has been saved.`,
        duration: 3000,
        className: 'bg-green-600 text-white border border-gray-200',
      });
      changeRating();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        duration: 3000,
        className: 'bg-red-600 text-white border border-gray-200',
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-start justify-start w-full rounded-lg border shadow-lg p-1">
        <div className="w-[180px] flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/tv/${tv.id}`}>
                  <Image
                    src={tv.poster_path ? imageSrc : '/poster-default.svg'}
                    alt={tv.name}
                    className="w-full h-56 object-cover rounded-lg hover:cursor-pointer"
                    width={400}
                    height={400 * 1.618}
                    onError={() => setImageSrc('/poster-default.svg')}
                    priority
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tv.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col justify-between gap-5 py-3 w-5/6">
          <div className="flex justify-start items-center gap-5">
            <div className="relative w-fit h-fit">
              <Rating rating={tv.vote_average} />
            </div>
            <div>
              <Link href={`/tv/${tv.id}`}>
                <h3 className="text-base text-left font-bold">{tv.name}</h3>
              </Link>
              {tv.first_air_date && <h3 className="text-base text-left">{formatDate(tv.first_air_date)}</h3>}
            </div>
          </div>
          {tv.overview && <p className="text-base text-justify">{tv.overview}</p>}

          <div className="flex flex-row items-center gap-10">
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`rounded-full border border-gray-200 ${
                      rating !== null ? 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold' : 'hover:bg-yellow-500'
                    } mr-4`}
                  >
                    {rating != null ? rating : <Star className="text-yellow-500 font-bold fill-white" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  sideOffset={8}
                  align="center"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-full flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={'ghost'}
                              size={'icon'}
                              onClick={() => handlClearMyVote(rating)}
                            >
                              <CircleMinus />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Clear my vote</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Slider
                        value={[rating != null ? rating : 0]}
                        max={100}
                        step={10}
                        onValueChange={(value) => setRating(value[0])}
                      />
                      <Button
                        size={'sm'}
                        onClick={() => handlVote(rating)}
                        disabled={originRating == rating}
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="text-gray-500">Rate it!</div>
            </div>
            <div className="flex items-center">
              <Button
                variant="secondary"
                size="icon"
                className={`rounded-full border border-gray-200 ${
                  favorite ? 'bg-red-400 hover:bg-red-500' : 'hover:bg-red-400'
                } mr-4`}
                onClick={() => handlClickFavorite(favorite)}
              >
                <Heart className="text-red-400 font-bold fill-white" />
              </Button>
              <div className="text-gray-500">Favorite</div>
            </div>
            <div className="flex items-center">
              <Button
                variant="secondary"
                size="icon"
                className={`rounded-full border border-gray-200 ${
                  watchlist ? 'bg-sky-600 hover:bg-sky-700' : 'hover:bg-sky-600'
                } mr-4`}
                onClick={() => handlClickWatchlist(watchlist)}
              >
                <Bookmark className="text-sky-600 font-bold fill-white" />
              </Button>
              <div className="text-gray-500">Watchlist</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteTVCard;
