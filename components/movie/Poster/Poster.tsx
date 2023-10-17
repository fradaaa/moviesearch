import { getMovie } from "@/api";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import PlayTrailer from "./PlayTrailer";
import ReleaseDate from "./ReleaseDate";
import { MovieInfo } from "@/types";

type PosterProps = {
  id: string;
};

const Poster = async ({ id }: PosterProps) => {
  const {
    title,
    original_title,
    poster_path,
    release_date,
    genres,
    vote_average,
    vote_count,
    videos: { results },
  } = await getMovie(id);
  const src = getImageURL.getPoster(poster_path, "original");
  const movieInfo: MovieInfo = {
    poster_path,
    release_date,
    title,
    original_title,
    genres,
    vote_average,
    vote_count,
  };

  return (
    <div className="relative basis-2/5 rounded-sm border-8 border-sky-800">
      <Image src={src} alt={`${title}'s poster`} width={500} height={750} />
      <ReleaseDate release_date={release_date} />
      <PlayTrailer videos={results} movieInfo={movieInfo} />
    </div>
  );
};

export default Poster;
