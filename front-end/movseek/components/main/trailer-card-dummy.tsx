import Image from 'next/image';

const TrailerCardDummy = () => {
  return (
    <div className="max-w-md mx-auto bg-white text-white rounded-lg overflow-hidden">
      <div className="w-full h-44">
        <div className="w-full h-full">
          <Image
            src={'/poster-default.svg'}
            alt={'thumbnail'}
            className="w-full h-full object-cover hover:cursor-pointer"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerCardDummy;
