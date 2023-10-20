import { getMovie, getMovieImages } from "@/api";
import MovieDetails from "@/components/movie/MovieDetails/MovieDetails";
import Poster from "@/components/Poster/Poster";
import TitleInfo from "@/components/TitleInfo/TitleInfo";
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
    title: `${title}, ${year} - description, cast, images - Moviesearch`,
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = params;

  const movie = await getMovie(id);
  const images = await getMovieImages(id);

  const {
    credits: { cast },
  } = movie;

  return (
    <>
      <div className="flex">
        <Poster item={movie} />
        <TitleInfo id={id} item={movie} />
      </div>
      <MovieDetails images={images} cast={cast} />
    </>
  );
}
