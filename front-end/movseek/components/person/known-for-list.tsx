import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import KnownForCard from '@/components/person/known-for-card';
import type { PeopleCredit } from '@/models/people-types';

interface KnownForListProps {
  knownFors: PeopleCredit[];
}

const KnownForList: React.FC<KnownForListProps> = ({ knownFors }) => {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <div className="flex space-x-8">
          <CarouselContent>
            {knownFors.slice(0, 60).map((knownFor, index) => (
              <CarouselItem
                key={index}
                className="basis-44 h-80"
              >
                <KnownForCard knownFor={knownFor} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
            <CarouselPrevious className="p-2 bg-gray-800 text-white rounded-full" />
          </div>
          <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
            <CarouselNext className="p-2 bg-gray-800 text-white rounded-full" />
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default KnownForList;
