import type { Credits, PeopleCredit, PeopleDetail } from '@/models/people-types';
import KnownForList from '@/components/person/known-for-list';

interface MainPersonInformationProps {
  person: PeopleDetail;
  credits: Credits;
}

const MainPersonInformation: React.FC<MainPersonInformationProps> = ({ person, credits }) => {
  const peopleCredits: PeopleCredit[] = [
    ...credits.movie_credits.cast,
    ...credits.movie_credits.crew,
    ...credits.tv_credits.cast,
    ...credits.tv_credits.crew,
  ];
  const uniquePeopleCredits: PeopleCredit[] = [...new Map(peopleCredits.map((credit) => [credit.id, credit])).values()];

  return (
    <div className="pb-10 px-5">
      <div className="container mx-auto text-black">
        <div className="flex flex-col justify-between items-start ml-10 gap-5">
          <h1 className="text-3xl font-bold">{person.name}</h1>
          {person.biography && (
            <div>
              <h1 className="text-md font-bold mb-1">Biography</h1>
              <p className="text-sm max-w-3xl">{person.biography}</p>
            </div>
          )}
          <h1 className="text-md font-bold mb-1">Known For</h1>
          <KnownForList knownFors={uniquePeopleCredits} />
        </div>
      </div>
    </div>
  );
};

export default MainPersonInformation;
