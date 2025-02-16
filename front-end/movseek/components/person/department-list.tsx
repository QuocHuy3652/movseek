import type { Credits } from '@/models/people-types';
import { ChevronDown, XIcon } from 'lucide-react';
import Department from '@/components/person/department';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getDepartmentArray, groupAndSortByDepartment } from '@/utils/people-detail-page';

interface DepartmentListProps {
  credits: Credits;
  knownForDepartment: string;
}

function DropdownItem({ label, number, onClick }: { label: string; number: number; onClick: () => void }) {
  return (
    <div
      className="flex justify-between px-4 py-2 text-sm rounded-lg hover:bg-gray-200 hover:text-gray-900"
      onClick={onClick}
    >
      <div>{label}</div>
      <div className="text-gray-400">{number}</div>
    </div>
  );
}

const DepartmentList: React.FC<DepartmentListProps> = ({ credits, knownForDepartment }) => {
  const [selectedType, setSelectedType] = useState<'movie' | 'tv' | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined);

  const handleTypeSelect = (type: 'movie' | 'tv' | undefined) => {
    setSelectedType(type);
  };

  const handleDepartmentSelect = (department: string | undefined) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="pb-10 px-5">
      <div className="container mx-auto text-black">
        <div className="flex flex-col justify-between items-start ml-10 gap-5">
          <div className="flex items-center justify-end w-full">
            <div className="flex items-center space-x-5 text-black text-lg font-medium gap-5">
              {(selectedType != undefined || selectedDepartment != undefined) && (
                <Button
                  size={'icon'}
                  variant={'outline'}
                  onClick={() => {
                    handleDepartmentSelect(undefined);
                    handleTypeSelect(undefined);
                  }}
                >
                  <XIcon></XIcon>
                </Button>
              )}
              <div className="relative group hover:cursor-pointer">
                <span className="flex items-center gap-2">
                  All <ChevronDown />
                </span>
                <div className="absolute left-0 -translate-x-14 hidden w-48 bg-white text-gray-800 rounded-lg shadow-lg group-hover:block">
                  <DropdownItem
                    number={credits.movie_credits.cast.length + credits.movie_credits.crew.length}
                    label="Movies"
                    onClick={() => handleTypeSelect('movie')}
                  />
                  <DropdownItem
                    number={credits.tv_credits.cast.length + credits.tv_credits.crew.length}
                    label="TV Shows"
                    onClick={() => handleTypeSelect('tv')}
                  />
                </div>
              </div>
              <div className="relative group hover:cursor-pointer">
                <span className="flex items-center gap-2">
                  Department <ChevronDown />
                </span>
                <div className="absolute left-0 -translate-x-14 hidden w-48 bg-white text-gray-800 rounded-lg shadow-lg group-hover:block">
                  {getDepartmentArray(credits).map((department, index) => (
                    <DropdownItem
                      key={index}
                      number={department.count}
                      label={department.name == 'undefined' ? 'Others' : department.name}
                      onClick={() => handleDepartmentSelect(department.name)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {groupAndSortByDepartment(credits, knownForDepartment, {
            type: selectedType,
            filterDepartment: selectedDepartment,
          }).map((element, index) => (
            <Department
              key={index}
              props={element}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
