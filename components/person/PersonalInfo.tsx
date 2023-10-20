import { getPerson } from "@/api";
import { Person } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type PersonalInfoProps = {
  id: string;
};

const genderMap: {
  [K in Person["gender"]]: string;
} = {
  0: "Not set ",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

const PersonalInfo = async ({ id }: PersonalInfoProps) => {
  const {
    profile_path,
    name,
    known_for_department,
    gender,
    birthday,
    place_of_birth,
  } = await getPerson(id);

  const src = getImageURL.getProfile(profile_path, "h632");
  const birthDate = birthday && formatDate(birthday);

  return (
    <div className="basis-1/5">
      <Image
        src={src}
        alt={name}
        width={300}
        height={450}
        className="rounded-lg"
      />
      <section>
        <h3 className="mt-8 font-bold">Personal Info</h3>
        <div className="mt-4 text-sm">
          <p>
            <span className="block font-bold">Known For</span>
            {known_for_department}
          </p>
          <p>
            <span className="mt-2 block font-bold">Gender</span>
            {genderMap[gender]}
          </p>
          <p>
            <span className="mt-2 block font-bold">Birthday</span>
            {birthDate
              ? `${birthDate.day} ${birthDate.monthName}, ${birthDate.year} • ${
                  new Date().getFullYear() - 1 - birthDate.year
                } years old`
              : "—"}
          </p>
          <p>
            <span className="mt-2 block font-bold">Place of Birth</span>
            {place_of_birth ? place_of_birth : "—"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PersonalInfo;
