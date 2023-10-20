import { Movie, TVSeries } from "@/types";
import { isMovie } from "@/utils/typeHelpers";
import Link from "next/link";
import Cast from "./Cast";
import Rating from "./Rating";
import { getDirectorAndWriter, getRuntime } from "./utils";
import TVSeriesExtras from "./TVSeriesExtras";

type TitleInfoProps = {
  id: string;
  item: Movie | TVSeries;
};

const TitleInfo = ({ id, item }: TitleInfoProps) => {
  const {
    genres,
    vote_average,
    overview,
    credits: { cast, crew },
  } = item;
  const people = getDirectorAndWriter(crew);

  return (
    <div className="ml-10 basis-3/5">
      <h1 className="text-4xl font-bold">
        {isMovie(item)
          ? item.title || item.original_title
          : item.name || item.original_name}
      </h1>
      <p className="mt-3">{genres.map(({ name }) => name).join(" / ")}</p>
      <p className="mt-3">{getRuntime(item)}</p>
      <Rating vote_average={vote_average} />
      <div className="mt-6 flex gap-8">
        {people.map(
          (person) =>
            person && (
              <div key={person.id}>
                <Link
                  href={`/person/${person.id}`}
                  className="transition-colors hover:text-blue-700"
                >
                  <p className="font-bold">{person.name}</p>
                </Link>
                <p className="text-sm text-gray-400">
                  {person.job === "Director" || person.job === "Writer"
                    ? person.job
                    : person.known_for_department}
                </p>
              </div>
            ),
        )}
      </div>
      {!isMovie(item) && <TVSeriesExtras item={item} />}
      <Cast cast={cast} id={id} />
      <div className="mt-6">
        <h3 className="font-bold uppercase">Synopsis</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default TitleInfo;
