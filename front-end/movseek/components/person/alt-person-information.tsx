import { Link2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { PeopleDetail } from '@/models/people-types';

interface AltPersonInformationProps {
  person: PeopleDetail;
  numOfCredits: number;
}

const AltPersonInformation: React.FC<AltPersonInformationProps> = ({ person, numOfCredits }) => {
  return (
    <div className="flex flex-col gap-8 mt-8">
      {person.homepage && person.homepage != '' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={person.homepage} target="_blank" rel="noopener noreferrer" className="w-fit">
                <div className="hover:bg-gray-100 hover:cursor-pointer w-fit p-2 rounded-sm">
                  <Link2 className="w-8 h-8" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Visit Homepage</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div>
        <h1 className="font-bold text-xl mb-2">Personal Infomation</h1>

        <h1 className="font-bold text-lg">Known For</h1>
        <div>{person.known_for_department}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Credits</h1>
        <div>{numOfCredits}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Gender</h1>
        <div>{person.gender == 1 ? 'Female' : person.gender == 2 ? 'Male' : 'Not specified'}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Birthday</h1>
        <div>{person.birthday}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Place of Birth</h1>
        <div>{person.place_of_birth}</div>
      </div>
      <div>
        <h1 className="font-bold text-lg">Also Known As</h1>
        {person.also_known_as.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
    </div>
  );
};

export default AltPersonInformation;
