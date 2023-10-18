import { getMovie } from "@/api";
import PersonCard from "@/components/movie/PersonCard";
import { CrewCredit } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const { title, release_date } = await getMovie(id);

  const { year } = formatDate(release_date);

  return {
    title: `${title}, ${year} — cast and crew — Moviesearch`,
  };
}

export default async function MovieCastPage({ params }: Props) {
  const { id } = params;

  const {
    credits: { cast, crew },
    title,
    poster_path,
    release_date,
  } = await getMovie(id);
  const crewMembers = formatCrewMembers(crew);
  const { year } = formatDate(release_date);

  return (
    <>
      <div className="mt-6 flex items-center border-b-2 border-b-gray-800 pb-4">
        <Image
          src={getImageURL.getPoster(poster_path, "w342")}
          className="rounded-md"
          alt={title}
          width={125}
          height={175}
        />
        <div className="ml-8">
          <h1 className="mb-4 text-3xl font-bold">
            <Link
              href={`/movie/${id}`}
              className="transition-colors hover:text-blue-600"
            >
              {title}
            </Link>{" "}
            <span className="font-normal text-gray-400">({year})</span>
          </h1>
          <Link
            href={`/movie/${id}`}
            className="flex items-center font-bold text-gray-300 transition-colors hover:text-blue-600"
          >
            <LuArrowLeft className="mr-2" /> Back to movie
          </Link>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2">
        {
          <ul>
            <h2 className="text-2xl font-bold">
              Cast{" "}
              <span className="font-montserrat font-normal text-gray-400">{`${cast.length}`}</span>
            </h2>
            {cast.map((person) => {
              return (
                <li key={person.id} className="mt-4 flex">
                  <PersonCard person={person} />
                </li>
              );
            })}
          </ul>
        }
        <ul>
          <h2 className="text-2xl font-bold">
            Crew{" "}
            <span className="font-montserrat font-normal text-gray-400">{`${crew.length}`}</span>
          </h2>
          {Object.entries(crewMembers).map(([dep, members]) => (
            <ul key={dep}>
              <h3 className="mt-6 font-bold">{dep}</h3>
              {members.map((person) => {
                return (
                  <li key={id + person.credit_id} className="mt-4 flex">
                    <PersonCard person={person} />
                  </li>
                );
              })}
            </ul>
          ))}
        </ul>
      </div>
    </>
  );
}

const formatCrewMembers = (crew: CrewCredit[]) => {
  const deps: {
    [department: string]: CrewCredit[];
  } = {};

  crew
    .sort((a, b) => a.department.localeCompare(b.department))
    .forEach((person) => {
      if (!deps[person.department]) deps[person.department] = [];

      deps[person.department].push(person);
    });

  return deps;
};
