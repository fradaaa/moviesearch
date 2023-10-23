import { CastCredit } from "@/types";
import Link from "next/link";
import PersonCard from "../PersonCard";

type TitleCastProps = {
  cast: CastCredit[];
  id: string;
  type: "movie" | "tv";
};

const TitleCast = ({ cast, id, type }: TitleCastProps) => {
  const titleCast = cast.slice(0, 20);

  return (
    <div>
      <ul className="mt-4 grid grid-cols-2">
        {titleCast.map((person) => {
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
