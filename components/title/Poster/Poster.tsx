import { Movie, MovieInfo, TVSeries } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import PlayTrailer from "./PlayTrailer";
import ReleaseDate from "./ReleaseDate";
import { isMovie } from "@/utils/typeHelpers";

type PosterProps = {
  item: Movie | TVSeries;
};

const Poster = ({ item }: PosterProps) => {
  const {
    poster_path,
    genres,
    vote_average,
    vote_count,
    videos: { results },
  } = item;

  const movieInfo: MovieInfo = {
    release_date: isMovie(item) ? item.release_date : item.first_air_date,
    title: isMovie(item) ? item.title : item.name,
    original_title: isMovie(item) ? item.original_title : item.original_name,
    poster_path,
    genres,
    vote_average,
    vote_count,
  };
  const { title, release_date } = movieInfo;

  const src = getImageURL.getPoster(poster_path, "original");

  return (
    <div className="relative basis-2/5 rounded-sm border-8 border-sky-800">
      <Image src={src} alt={title} width={500} height={750} priority />
      <ReleaseDate release_date={release_date} />
      <PlayTrailer videos={results} movieInfo={movieInfo} />
    </div>
  );
};

export default Poster;
