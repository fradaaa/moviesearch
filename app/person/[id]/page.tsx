import { getPerson, getPersonCombinedCredits } from "@/api";
import PersonBiography from "@/components/person/PersonBiography";
import PersonCredits from "@/components/person/PersonCredits";
import PersonalInfo from "@/components/person/PersonalInfo";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const { name } = await getPerson(id);

  return {
    title: `${name} — Moviesearch`,
  };
}

export default async function PersonPage({ params }: Props) {
  const { id } = params;

  const { known_for_department } = await getPerson(id);
  const credits = await getPersonCombinedCredits(id);

  return (
    <div className="flex gap-8">
      <PersonalInfo id={id} />
      <div className="max-w-[860px] basis-4/5">
        <PersonBiography id={id} />
        <PersonCredits
          id={id}
          known_for_department={known_for_department}
          credits={credits}
        />
      </div>
    </div>
  );
}
