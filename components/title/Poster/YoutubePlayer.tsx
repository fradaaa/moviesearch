type YoutubePlayerProps = {
  videoId?: string;
};

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => (
  <div className="h-full w-full">
    <iframe
      id="video"
      className="h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      width={640}
      height={360}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
      allowFullScreen={true}
      title="Embedded youtube"
    />
  </div>
);

export default YoutubePlayer;
