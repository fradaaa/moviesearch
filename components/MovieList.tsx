import { getMovieList } from "@/api";
import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type MovieListProps = {
  type: "popular" | "top_rated" | "upcoming";
};

const MovieList = async ({ type }: MovieListProps) => {
  const movies = await getMovieList(type);
  console.log(movies[0]);

  return (
    <div className="mt-10">
      <h2 className="text-3xl capitalize">
        {type === "top_rated" ? "Top Rated" : type}
      </h2>
      <ul className="mt-4 grid grid-cols-5 justify-between gap-8">
        {movies.map(({ id, poster_path, title, release_date }) => {
          const src = getImageURL.getPoster(poster_path, "w342");
          const { year, monthName, day } = formatDate(release_date);

          return (
            <li key={id}>
              <div className="overflow-hidden rounded-md">
                <Image src={src} alt={title} width={200} height={300} />
              </div>
              <div className="mt-2">
                <h2 className="font-bold">{title}</h2>
                <p className="font-montserrat">
                  {`${monthName} ${day}, ${year}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
