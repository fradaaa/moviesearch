import { getPerson } from "@/api";
import PersonBiography from "@/components/person/PersonBiography";
import PersonCredits from "@/components/person/PersonCredits";
import PersonalInfo from "@/components/person/PersonalInfo";
import { getImageURL } from "@/utils/getImageURL";
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

  const { profile_path, name } = await getPerson(id);

  const src = getImageURL.getProfile(profile_path, "h632");

  return (
    <div className="flex gap-8">
      <PersonalInfo id={id} />
      <div className="max-w-[860px] basis-4/5">
        <PersonBiography id={id} />
        <PersonCredits id={id} />
      </div>
    </div>
  );
}
