import { getMovie, getTitleImages } from "@/api";
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

  const { title, release_date } = await getMovie(id, true);

  const { year } = formatDate(release_date);

  return {
    title: `${title}, ${year} - description, cast, images - Moviesearch`,
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = params;

  const movie = await getMovie(id, true);
  const images = await getTitleImages(id, "movie");

  const {
    credits: { cast },
  } = movie;

  return (
    <>
      <div className="flex">
        <Poster item={movie} />
        <TitleInfo id={id} item={movie} />
      </div>
      <TitleDetails images={images} cast={cast} id={id} type="movie" />
    </>
  );
}
