import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { CircleMinus, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Movie } from '@/models/movie-detail-types';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { addComment, deleteComment, getCommentsByMedia, updateComment } from '@/apis/reviews';
import { Review } from '@/models/review-types';
import { Rating } from '@/models/rating-types';
import { addRating, deleteRating, getRatingsByMedia, updateRating } from '@/apis/ratings';
import ReviewCard from '@/components/movie/review-card';

interface ReviewsAndRatingProps {
  movie: Movie;
  isSignedIn: boolean;
  user_id: string;
  avatar: string;
  username: string;
}

const ReviewsAndRating: React.FC<ReviewsAndRatingProps> = ({ movie, isSignedIn, user_id, avatar, username }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [myRating, setMyRating] = useState<number | null>(null);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [myComment, setMyComment] = useState<string>('');
  const [isCommented, setIsCommented] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [originReview, setOriginReview] = useState<string>('');
  const [originRating, setOriginRating] = useState<number | null>(null);
  const [ratingAverage, setRatingAverage] = useState<number>(0);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      setMyComment(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await getCommentsByMedia(parseInt(movie.id), 'movie');
        if (Array.isArray(commentsResponse.data.data.comments)) {
          setReviews(commentsResponse.data.data.comments);
          const comments: Review[] = commentsResponse.data.data.comments;
          const commentObj = comments.find((comment) => comment.user_id === user_id);
          if (commentObj?.user_id == user_id) {
            setIsCommented(true);
            setMyComment(commentObj.comment);
            setOriginReview(commentObj.comment);
          }
        }
        const ratingsResponse = await getRatingsByMedia(parseInt(movie.id), 'movie');
        if (Array.isArray(ratingsResponse.data.data.ratings)) {
          setRatings(ratingsResponse.data.data.ratings);
          setRatingAverage(ratingsResponse.data.data.average);
          const ratings: Rating[] = ratingsResponse.data.data.ratings;
          const ratingObj = ratings.find((rating) => rating.user_id === user_id);
          if (ratingObj?.user_id == user_id) {
            setIsRated(true);
            setMyRating(ratingObj.rating * 10);
            setOriginRating(ratingObj.rating * 10);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originRating, originReview]);

  const handleSubmit = async () => {
    if (isSignedIn) {
      try {
        let toastMessage = '';
        if (myComment.trim() != originReview.trim()) {
          let commentToast = '';
          if (myComment.trim() !== '') {
            if (isCommented) {
              await updateComment(avatar, myComment, parseInt(movie.id), 'movie', user_id, username);
              commentToast = 'Your comment has been updated.';
            } else {
              await addComment(avatar, myComment, parseInt(movie.id), 'movie', user_id, username);
              commentToast = 'Your comment has been added.';
              setIsCommented(true);
            }
          } else if (isCommented) {
            await deleteComment(user_id, parseInt(movie.id), 'movie');
            commentToast = 'Your comment has been deleted.';
            setIsCommented(false);
          }
          if (myRating != originRating) {
            toastMessage += commentToast + ' ';
          } else {
            toast({
              title: 'Success',
              description: commentToast,
              duration: 3000,
              className: 'bg-green-600 text-white border border-gray-200',
            });
          }
        }
        if (myRating != originRating) {
          let ratingToast = '';
          if (myRating != null) {
            if (isRated) {
              await updateRating(avatar, myRating / 10, parseInt(movie.id), 'movie', user_id, username);
              ratingToast = 'Your rating has been updated.';
            } else {
              await addRating(avatar, parseInt(movie.id), myRating / 10, 'movie', user_id, username);
              ratingToast = 'Your rating has been added.';
              setIsRated(true);
            }
          } else if (isRated) {
            await deleteRating(user_id, parseInt(movie.id), 'movie');
            ratingToast = 'Your rating has been deleted.';
            setIsRated(false);
          }
          if (myComment.trim() != originReview.trim()) {
            toastMessage += 'And ' + ratingToast;
          } else {
            toast({
              title: 'Success',
              description: ratingToast,
              duration: 3000,
              className: 'bg-green-600 text-white border border-gray-200',
            });
          }
        }
        if (myComment.trim() != originReview.trim() && myRating != originRating) {
          toast({
            title: 'Success',
            description: toastMessage,
            duration: 3000,
            className: 'bg-green-600 text-white border border-gray-200',
          });
        }
        setOriginReview(myComment);
        setOriginRating(myRating);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred. Please try again later.',
          duration: 3000,
          className: 'bg-red-600 text-white border border-gray-200',
        });
        console.error(error);
      }
    } else {
      toast({
        title: 'Login Required',
        description: 'You must log in to perform this action.',
        duration: 3000,
        className: 'bg-primary text-white border border-gray-200',
        action: (
          <ToastAction
            altText="Go to login"
            className="text-primary bg-white hover:bg-gray-200 px-3 py-1 rounded-lg"
            onClick={() => {
              router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
            }}
          >
            Sign in
          </ToastAction>
        ),
      });
    }
  };

  const findRatingForReview = (review: Review, ratings: Rating[]): Rating | null => {
    return ratings.find((rating) => rating.user_id === review.user_id) || null;
  };

  return (
    <div>
      <div className="my-2">
        <div className="w-full mx-auto p-4 border rounded-lg shadow-lg bg-white space-y-6">
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{`${isCommented ? 'My review' : 'Write a review'}`}</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setMyComment('')}
                      >
                        <CircleMinus />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear my review</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                placeholder="Write your review here..."
                value={myComment}
                rows={3}
                onChange={handleCommentChange}
                maxLength={2000}
                className="w-full"
              />
              <div className="text-right text-sm text-gray-500">{myComment.length}/2000</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">{`${isRated ? 'My rating' : 'Rate the movie'}`}</h2>
              <div className="w-full flex items-center gap-5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setMyRating(null)}
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
                  value={[myRating != null ? myRating : 0]}
                  max={100}
                  step={10}
                  onValueChange={(value) => setMyRating(value[0] > 0 ? value[0] : null)}
                />
                <Button
                  variant="default"
                  size="icon"
                  className={`rounded-full border border-gray-200 p-6 mr-4`}
                  disabled={myRating == null || (myComment.trim() === originReview.trim() && myRating === originRating)}
                >
                  {myRating != null ? myRating : <Star className="font-bold fill-white" />}
                </Button>
              </div>
            </div>
          </div>
          <Button
            disabled={myComment.trim() === originReview.trim() && myRating === originRating}
            className="w-full"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-14">
            <div className="font-bold text-xl my-5">Social</div>
            <div>
              Reviews <span className="text-gray-500">{reviews.length}</span>
            </div>
            <div>
              Rating count <span className="text-gray-500">{ratings.length}</span>
            </div>
            <div>
              Rating average <span className="text-gray-500">{Math.round(ratingAverage * 10)}</span>
            </div>
          </div>
          {reviews.length > 0 ? (
            <div className="space-y-5">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  review={review}
                  rating={findRatingForReview(review, ratings)?.rating || null}
                />
              ))}
            </div>
          ) : (
            <>
              <span>{`We don\'t have any reviews for `}</span>
              <span className="font-bold">{movie.title}.</span>
              <span> Be the first to leave a review.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRating;
