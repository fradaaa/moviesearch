import { CastCredit } from "@/types";
import PersonCard from "../PersonCard";

type MovieCastProps = {
  cast: CastCredit[];
};

const MovieCast = ({ cast }: MovieCastProps) => {
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
    </div>
  );
};

export default MovieCast;
