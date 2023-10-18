import { CastCredit, CrewCredit } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type PersonCardProps = {
  person: CastCredit | CrewCredit;
};

const PersonCard = ({ person }: PersonCardProps) => {
  const { profile_path, name } = person;

  const src = profile_path && getImageURL.getProfile(profile_path, "w185");

  return (
    <>
      {profile_path ? (
        <Image
          src={src}
          alt={name}
          width={80}
          height={120}
          className="rounded-md"
        />
      ) : (
        <div className="flex h-[120px] w-[80px] items-center justify-center rounded-md bg-gray-300">
          <svg
            id="glyphicons-basic"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path
              fill="#b5b5b5"
              id="user"
              d="M27,24.23669V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V24.23669a1.57806,1.57806,0,0,1,.93115-1.36462L10.0672,20.167A5.02379,5.02379,0,0,0,14.55273,23h1.89454a5.02336,5.02336,0,0,0,4.48535-2.83313l5.13623,2.7052A1.57806,1.57806,0,0,1,27,24.23669ZM9.64478,14.12573a2.99143,2.99143,0,0,0,1.31073,1.462l.66583,3.05176A2.99994,2.99994,0,0,0,14.55237,21h1.89526a2.99994,2.99994,0,0,0,2.931-2.36047l.66583-3.05176a2.99115,2.99115,0,0,0,1.31073-1.462l.28-.75146A1.2749,1.2749,0,0,0,21,11.62988V9c0-3-2-5-5.5-5S10,6,10,9v2.62988a1.2749,1.2749,0,0,0-.63519,1.74439Z"
            />
          </svg>
        </div>
      )}
      <div className="ml-4">
        <p className="text-2xl font-bold">{name}</p>
        <p className="text-gray-400">
          {isCrewMember(person) ? person.job : person.character}
        </p>
      </div>
    </>
  );
};

const isCrewMember = (person: any): person is CrewCredit =>
  person.department !== undefined;

export default PersonCard;
