import { FilterSortState } from '@/models/movie-list-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 == obj2) return true;
  if (typeof obj1 != 'object' || typeof obj2 != 'object' || obj1 == null || obj2 == null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
};

function buildRoute(baseUrl: string, filters: FilterSortState): string {
  const params = new URLSearchParams();

  // Handle sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'release-date-desc':
        params.append('time_order', '-1');
        break;
      case 'release-date-asc':
        params.append('time_order', '1');
        break;
      case 'popularity-desc':
        params.append('popularity_order', '-1');
        break;
      case 'popularity-asc':
        params.append('popularity_order', '1');
        break;
      case 'rating-desc':
        params.append('vote_order', '-1');
        break;
      case 'rating-asc':
        params.append('vote_order', '1');
        break;
      case 'title-a-z':
        params.append('title_order', '1');
        break;
      case 'title-z-a':
        params.append('title_order', '-1');
        break;
    }
  }

  // Release date range
  if (filters.releaseDate?.from) {
    params.append('start_date', filters.releaseDate.from.toISOString().split('T')[0]);
  }
  if (filters.releaseDate?.to) {
    params.append('end_date', filters.releaseDate.to.toISOString().split('T')[0]);
  }

  // User score range
  if (filters.userScore?.from !== undefined) {
    params.append('start_average_vote', filters.userScore.from.toString());
  }
  if (filters.userScore?.to !== undefined) {
    params.append('end_average_vote', filters.userScore.to.toString());
  }

  // Genre IDs (add each genre_id separately)
  if (filters.genre?.length) {
    filters.genre.forEach((id) => params.append('genre_ids', id.toString()));
  }

  // Return the final URL
  const queryString = params.toString();
  return `${baseUrl}?${queryString}`;
}

export { deepEqual, buildRoute };
