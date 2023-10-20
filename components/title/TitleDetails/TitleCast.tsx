import { CastCredit, TVCastCredit } from "@/types";
import PersonCard from "../PersonCard";
import Link from "next/link";

type TitleCastProps = {
  cast: CastCredit[] | TVCastCredit[];
  id: string;
  type: "movie" | "tv";
};

const TitleCast = ({ cast, id, type }: TitleCastProps) => {
  return (
    <div>
      {/* <h3 className="font-bold">
        Cast <span className="text-gray-400">{cast.length}</span>
      </h3> */}
      <ul className="mt-4 grid grid-cols-2">
        {cast.map((person) => {
          return (
            <li key={person.id} className="mt-4 flex">
              <PersonCard person={person} />
            </li>
          );
        })}
      </ul>
      <Link
        href={`/${type}/${id}/cast`}
        className="mt-6 block text-xl transition-colors hover:text-blue-700"
      >
        Full Cast & Crew
      </Link>
    </div>
  );
};

export default TitleCast;
