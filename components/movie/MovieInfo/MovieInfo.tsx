import { getMovie } from "@/api";
import Rating from "./Rating";
import Cast from "./Cast";

type MovieInfoProps = {
  id: string;
};

const MovieInfo = async ({ id }: MovieInfoProps) => {
  const {
    title,
    original_title,
    genres,
    runtime,
    vote_average,
    overview,
    credits: { cast },
  } = await getMovie(id);

  return (
    <div className="ml-8 basis-3/5">
      <h1 className="text-4xl font-bold">{title || original_title}</h1>
      <p className="mt-3">{genres.map(({ name }) => name).join(" / ")}</p>
      <p className="mt-3">{convertRuntime(runtime)}</p>
      <Rating vote_average={vote_average} />
      <Cast cast={cast} />
      <div className="mt-6">
        <h3 className="font-bold uppercase">Synopsis</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};

const convertRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - hours * 60;

  return `${hours}h${minutes}m`;
};

export default MovieInfo;
