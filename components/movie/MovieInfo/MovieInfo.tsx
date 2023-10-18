import { getMovie } from "@/api";
import Rating from "./Rating";
import Cast from "./Cast";
import { CrewCredit } from "@/types";

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
    credits: { cast, crew },
  } = await getMovie(id);
  const people = getDirectorAndWriter(crew);

  return (
    <div className="ml-10 basis-3/5">
      <h1 className="text-4xl font-bold">{title || original_title}</h1>
      <p className="mt-3">{genres.map(({ name }) => name).join(" / ")}</p>
      <p className="mt-3">{convertRuntime(runtime)}</p>
      <Rating vote_average={vote_average} />
      <div className="mt-6 flex gap-8">
        {people.map(({ name, job, id }) => (
          <div key={id}>
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-400">{job}</p>
          </div>
        ))}
      </div>
      <Cast cast={cast} id={id} />
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

const getDirectorAndWriter = (crew: CrewCredit[]) => {
  const arr = [...crew].sort((a, b) => b.popularity - a.popularity);
  const director = arr.find(({ job }) => job === "Director");
  const writer = crew.find(
    ({ job }) => job === "Screenplay" || job === "Writer",
  );

  return [director, writer] as [CrewCredit, CrewCredit];
};

export default MovieInfo;
