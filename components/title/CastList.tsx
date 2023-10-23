import { CrewCredit, TVCastCredit, TVCrewCredit } from "@/types";
import PersonCard from "./PersonCard";

type CastListProps = {
  cast: TVCastCredit[];
  crew: TVCrewCredit[];
};

const CastList = ({ cast, crew }: CastListProps) => {
  const crewMembers = formatCrewMembers(crew);

  return (
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
            {members.map((person) => (
              <li key={person.id} className="mt-4 flex">
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export const formatCrewMembers = (crew: CrewCredit[]) => {
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

export default CastList;
