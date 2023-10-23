import { getTV } from "@/api";
import CastList from "@/components/title/CastList";
import TitleGoBackHeader from "@/components/title/TitleGoBackHeader";
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
    title: `${name}, ${year} — cast and crew — Moviesearch`,
  };
}

export default async function TVCastPage({ params }: Props) {
  const { id } = params;

  const {
    credits: { cast, crew },
    name,
    poster_path,
    first_air_date,
  } = await getTV(id, true);

  return (
    <>
      <TitleGoBackHeader
        id={id}
        poster_path={poster_path}
        release_date={first_air_date}
        title={name}
        type="tv"
      />
      <CastList cast={cast} crew={crew} />
    </>
  );
}
