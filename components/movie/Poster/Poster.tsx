import { getMovie } from "@/api";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import PlayTrailer from "./PlayTrailer";
import ReleaseDate from "./ReleaseDate";

const Poster = async () => {
  const { title, poster_path, release_date } = await getMovie();
  const src = getImageURL.getPoster(poster_path, "original");

  return (
    <div className="relative basis-2/5 rounded-sm border-8 border-sky-800">
      <Image src={src} alt={`${title}'s poster`} width={500} height={750} />
      <ReleaseDate release_date={release_date} />
      <PlayTrailer />
    </div>
  );
};

export default Poster;
