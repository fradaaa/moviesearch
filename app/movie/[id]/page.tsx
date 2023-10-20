import { getMovie, getMovieImages } from "@/api";
import MovieDetails from "@/components/movie/MovieDetails/MovieDetails";
import MovieInfo from "@/components/movie/MovieInfo/MovieInfo";
import Poster from "@/components/movie/Poster/Poster";
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
        <MovieInfo id={id} />
      </div>
      <MovieDetails images={images} cast={cast} />
    </>
  );
}
