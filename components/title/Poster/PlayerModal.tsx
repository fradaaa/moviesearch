import { MovieInfo, VideoResult } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import { getRatingColor } from "@/utils/getRatingColor";
import Image from "next/image";
import { useState } from "react";
import YoutubePlayer from "./YoutubePlayer";

type PlayerModalProps = {
  videos: VideoResult[];
  movieInfo: MovieInfo;
};

const PlayerModal = ({ videos, movieInfo }: PlayerModalProps) => {
  const {
    poster_path,
    title,
    original_title,
    release_date,
    genres,
    vote_average,
    vote_count,
  } = movieInfo;

  const [curVideo, setCurVideo] = useState("");

  const [_, textColor] = getRatingColor(vote_average);
  const { year } = formatDate(release_date);
  const src = getImageURL.getPoster(poster_path, "w185");

  const trailer = videos.find(({ type }) => type === "Trailer");

  return (
    <div className="flex h-full text-white">
      <div className="flex basis-8/12 items-center">
        <YoutubePlayer videoId={curVideo || trailer?.key} />
      </div>
      <div className="flex shrink-0 basis-4/12 flex-col">
        <div className="flex border-b-2 border-b-slate-600 p-4 pb-6">
          <Image
            className="rounded-md"
            src={src}
            alt={title}
            width={80}
            height={120}
          />
          <div className="ml-3">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-xs font-bold">{`${original_title}, ${year}`}</p>
            <p className="mt-2 text-xs">
              {genres.map(({ name }) => name).join(", ")}
            </p>
            <p className="mt-2 flex items-baseline gap-2 font-montserrat">
              <span className={`${textColor} font-bold`}>{vote_average}</span>
              <span className="text-xs">{vote_count}</span>
            </p>
          </div>
        </div>
        <div className="relative h-full overflow-hidden">
          <p className="p-4 font-bold">Watch more</p>
          <ul className="absolute inset-0 -right-5 top-14 overflow-y-auto p-4 pt-0">
            {videos.map(({ id, name, key, type }) => (
              <li
                key={id}
                className="mt-4 flex cursor-pointer gap-2 overflow-hidden rounded-s p-1 transition-colors hover:bg-slate-500"
                onClick={() => setCurVideo(key)}
              >
                <div className="shrink-0 basis-1/4 overflow-hidden rounded-s">
                  <Image
                    src={`https://img.youtube.com/vi/${key}/sddefault.jpg`}
                    alt={name}
                    width={100}
                    height={75}
                  />
                </div>
                <div className="basis-3/4">
                  <p>{name}</p>
                  <p className="text-xs text-gray-300">{type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
