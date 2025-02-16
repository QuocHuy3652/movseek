import type { MovieCast, MovieCrew, TVCast, TVCrew } from '@/models/people-types';
import Link from 'next/link';

interface DepartmentProps {
  props: { department: string; items: (MovieCrew | TVCrew | MovieCast | TVCast)[] };
}

const Department: React.FC<DepartmentProps> = ({ props }) => {
  return (
    <div className="flex flex-col items-start justify-center px-5 w-full rounded-lg border shadow-lg">
      <h1 className="font-bold text-2xl my-2">{props.department == 'undefined' ? 'Others' : props.department}</h1>
      <div className="flex flex-col w-full text-black text-lg font-medium">
        {Object.entries(
          props.items.reduce((groups, element) => {
            const year =
              'release_date' in element
                ? element.release_date?.split('-')[0]
                : element.first_air_date?.split('-')[0] || '—';
            if (!groups[year]) {
              groups[year] = [];
            }
            groups[year].push(element);
            return groups;
          }, {} as Record<string, typeof props.items>),
        )
          .sort(([yearA], [yearB]) => {
            if (yearA === '—') return -1; // Unknown lên đầu
            if (yearB === '—') return 1; // Unknown lên đầu
            return parseInt(yearB, 10) - parseInt(yearA, 10); // Sắp xếp giảm dần
          })
          .map(([year, elements]) => (
            <div
              key={year}
              className="flex flex-col w-full gap-5"
            >
              <div className="font-geist-mono italic">{year}</div>
              <div className="flex flex-col gap-5">
                {elements
                  .sort((a, b) => {
                    const dateA = new Date(
                      'release_date' in a ? a.release_date || '0000-00-00' : a.first_air_date || '0000-00-00',
                    );
                    const dateB = new Date(
                      'release_date' in b ? b.release_date || '0000-00-00' : b.first_air_date || '0000-00-00',
                    );
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(
                    (element, index) =>
                      ('title' in element ? element.title : element.name) && (
                        <div
                          key={index}
                          className="flex justify-between"
                        >
                          <div>
                            <Link href={'title' in element ? `/movie/${element.id}` : '#'}>
                              <div>{'title' in element ? element.title : element.name}</div>
                            </Link>
                            {(('character' in element && element.character) || ('job' in element && element.job)) && (
                              <div className="text-sm text-gray-600">
                                {'character' in element ? `as ${element.character}` : `${element.job}`}{' '}
                              </div>
                            )}
                          </div>
                          <div>{'release_date' in element ? element.release_date : element.first_air_date}</div>
                        </div>
                      ),
                  )}
              </div>
              <hr className="my-2 border-t border-gray-300" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Department;
