import { getMovie } from "@/api";
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

  const { title, release_date } = await getMovie(id);

  const { year } = formatDate(release_date);

  return {
    title: `${title}, ${year} — cast and crew — Moviesearch`,
  };
}

export default async function MovieCastPage({ params }: Props) {
  const { id } = params;

  const {
    credits: { cast, crew },
    title,
    poster_path,
    release_date,
  } = await getMovie(id);

  return (
    <>
      <TitleGoBackHeader
        id={id}
        poster_path={poster_path}
        release_date={release_date}
        title={title}
        type="movie"
      />
      <CastList cast={cast} crew={crew} />
    </>
  );
}
