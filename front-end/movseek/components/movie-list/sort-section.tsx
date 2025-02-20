import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterSortState } from '@/models/movie-list-types';

interface SortSectionProps {
  isOpenSort: boolean;
  setIsOpenSort: (values: boolean) => void;
  filterSortState: FilterSortState;
  updateFilterSort: (key: keyof FilterSortState, value: unknown) => void;
}

const SortSection: React.FC<SortSectionProps> = ({ isOpenSort, setIsOpenSort, filterSortState, updateFilterSort }) => {
  return (
    <div className="flex flex-col">
      <div className={`p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition border`}>
        <Collapsible
          open={isOpenSort}
          onOpenChange={setIsOpenSort}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex justify-between hover:cursor-pointer">
              <div className="text-lg font-bold">Sort</div>
              <div className={`transform transition-transform ${isOpenSort ? 'rotate-0' : '-rotate-90'}`}>
                <ChevronDown />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <hr className="my-2 border-t border-gray-300" />
            <div className="text-base">Sort Results By</div>
            <Select
              value={filterSortState.sort}
              onValueChange={(value) => updateFilterSort('sort', value)}
            >
              <SelectTrigger className="w-full text-xs bg-white">
                <SelectValue placeholder="Select an order" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="release-date-desc">Release Date Descending</SelectItem>
                  <SelectItem value="release-date-asc">Release Date Ascending</SelectItem>
                  <SelectItem value="popularity-desc">Popularity Descending</SelectItem>
                  <SelectItem value="popularity-asc">Popularity Ascending</SelectItem>
                  <SelectItem value="rating-desc">Rating Descending</SelectItem>
                  <SelectItem value="rating-asc">Rating Ascending</SelectItem>
                  <SelectItem value="title-a-z">Title (A-Z)</SelectItem>
                  <SelectItem value="title-z-a">Title (Z-A)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default SortSection;
