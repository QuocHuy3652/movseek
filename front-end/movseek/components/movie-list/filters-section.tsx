import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FilterSortState, GenresMovieResults } from '@/models/movie-list-types';
import DoubleSlider from '@/components/movie-list/double-sider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FiltersSectionProps {
  isOpenFilter: boolean;
  setIsOpenFilter: (values: boolean) => void;
  filterSortState: FilterSortState;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>, key: 'from' | 'to') => void;
  handleGenreClick: (genreId: number) => void;
  handleUserScoreChange: (newUserScore: number[]) => void;
  genreListResults: GenresMovieResults | null;
  loading: boolean;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  isOpenFilter,
  setIsOpenFilter,
  filterSortState,
  handleDateChange,
  handleGenreClick,
  handleUserScoreChange,
  genreListResults,
  loading,
}) => {
  return (
    <div className="flex flex-col">
      <div className={`p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition`}>
        <Collapsible
          open={isOpenFilter}
          onOpenChange={setIsOpenFilter}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex justify-between hover:cursor-pointer">
              <div className="text-lg font-bold">Filters</div>
              <div className={`transform transition-transform ${isOpenFilter ? 'rotate-0' : '-rotate-90'}`}>
                <ChevronDown />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="text-base mb-3">Release Dates</div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm">From</div>
                <Input
                  type="date"
                  value={
                    filterSortState.releaseDate.from ? filterSortState.releaseDate.from.toISOString().split('T')[0] : ''
                  }
                  onChange={(e) => handleDateChange(e, 'from')}
                  placeholder="YYYY-MM-DD"
                  className="w-40 bg-white"
                />
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm">To</div>
                <Input
                  type="date"
                  value={
                    filterSortState.releaseDate.to ? filterSortState.releaseDate.to.toISOString().split('T')[0] : ''
                  }
                  onChange={(e) => handleDateChange(e, 'to')}
                  placeholder="YYYY-MM-DD"
                  className="w-40 bg-white"
                />
              </div>
            </div>
            <div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="text-base">Genres</div>
              {genreListResults != null && !loading && (
                <div className="flex flex-wrap items-center">
                  {genreListResults.genres.map((genre, index) => (
                    <Button
                      key={index}
                      variant={'outline'}
                      size={'sm'}
                      className={`mr-2 mt-2 border text-xs rounded-full ${
                        filterSortState.genre.includes(genre.id) &&
                        'bg-primary text-white hover:bg-primary-dark hover:text-white'
                      } border-black`}
                      onClick={() => handleGenreClick(genre.id)}
                    >
                      {genre.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <hr className="my-2 border-t border-gray-300" />
              <div className="text-base mb-3">User Score</div>
              <DoubleSlider
                values={[filterSortState.userScore.from, filterSortState.userScore.to]}
                step={1}
                min={0}
                max={100}
                onChange={handleUserScoreChange}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FiltersSection;
