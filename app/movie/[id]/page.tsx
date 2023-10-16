import MovieInfo from "@/components/movie/MovieInfo/MovieInfo";
import Poster from "@/components/movie/Poster/Poster";

export default function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Poster id={id} />
      <MovieInfo id={id} />
    </>
  );
}
