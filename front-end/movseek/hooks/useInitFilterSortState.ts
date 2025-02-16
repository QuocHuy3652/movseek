import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const parseSortParams = (searchParams: URLSearchParams): string => {
  const timeOrder = searchParams.get('time_order');
  const popularityOrder = searchParams.get('popularity_order');
  const voteOrder = searchParams.get('vote_order');
  const titleOrder = searchParams.get('title_order');

  if (timeOrder) return timeOrder === '1' ? 'release-date-asc' : 'release-date-desc';
  if (popularityOrder) return popularityOrder === '1' ? 'popularity-asc' : 'popularity-desc';
  if (voteOrder) return voteOrder === '1' ? 'rating-asc' : 'rating-desc';
  if (titleOrder) return titleOrder === '1' ? 'title-a-z' : 'title-z-a';
  return ''; // Mặc định nếu không có sort
};

const parseDateParam = (dateParam: string | null): Date | null => {
  return dateParam ? new Date(dateParam) : null;
};

const useInitFilterSortState = () => {
  const searchParams = useSearchParams();

  const initFilterSortState = useMemo(() => {
    const genreIds = searchParams.getAll('genre_ids'); // Lấy tất cả giá trị `genre_ids`
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const startVote = searchParams.get('start_average_vote');
    const endVote = searchParams.get('end_average_vote');

    return {
      sort: parseSortParams(searchParams),
      genre: genreIds.map(Number), // Chuyển đổi tất cả `genre_ids` sang số
      releaseDate: {
        from: parseDateParam(startDate),
        to: parseDateParam(endDate) || new Date(), // Mặc định là ngày hiện tại nếu không có `end_date`
      },
      userScore: {
        from: startVote ? Number(startVote) : 0,
        to: endVote ? Number(endVote) : 100,
      },
    };
  }, [searchParams]);

  return initFilterSortState;
};

export default useInitFilterSortState;
