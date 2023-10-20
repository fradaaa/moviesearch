import { getTV, getTitleImages } from "@/api";
import Poster from "@/components/title/Poster/Poster";
import TitleDetails from "@/components/title/TitleDetails/TitleDetails";
import TitleInfo from "@/components/title/TitleInfo/TitleInfo";
import { formatDate } from "@/utils/formatDate";
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

  const { name, first_air_date } = await getTV(id);
  const { year } = formatDate(first_air_date);

  return {
    title: `${name}, ${year} — Moviesearch`,
  };
}

export default async function TVPage({ params }: Props) {
  const { id } = params;

  const tv = await getTV(id, true);
  const images = await getTitleImages(id, "tv");

  const {
    credits: { cast },
  } = tv;

  return (
    <>
      <div className="flex">
        <Poster item={tv} />
        <TitleInfo id={id} item={tv} />
      </div>
      <TitleDetails images={images} cast={cast} id={id} type="tv" />
    </>
  );
}
