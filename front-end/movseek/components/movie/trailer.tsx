const Trailer = ({ videoId, toggleVideo }: { videoId: string; toggleVideo: () => void }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={toggleVideo}
    >
      <div className="w-10/12 h-[90vh] video-container rounded-xl shadow-lg">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
