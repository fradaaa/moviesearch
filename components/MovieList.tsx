import { getMovieList } from "@/api";
import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import { getRatingColor } from "@/utils/getRatingColor";
import Image from "next/image";
import Link from "next/link";

type MovieListProps = {
  type: "popular" | "top_rated" | "upcoming";
};

const MovieList = async ({ type }: MovieListProps) => {
  const movies = await getMovieList(type);

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold capitalize">
        {type === "top_rated" ? "Top Rated" : type}
      </h2>
      <ul className="maxw mt-4 grid grid-cols-2 justify-between gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {movies.map(
          ({ id, poster_path, title, release_date, vote_average }) => {
            const src = getImageURL.getPoster(poster_path, "w342");
            const { year, monthName, day } = formatDate(release_date);
            const [bgRatingColor] = getRatingColor(vote_average);

            return (
              <li key={id}>
                <div className="relative overflow-hidden rounded-md">
                  <Link href={`/movie/${id}`}>
                    <Image src={src} alt={title} width={200} height={300} />
                    <span className="sr-only">{title}</span>
                    <span
                      className={`absolute right-3 top-3 block w-rating p-1 text-center font-montserrat ${bgRatingColor}`}
                    >
                      {vote_average}
                    </span>
                  </Link>
                </div>
                <div className="mt-2">
                  <h2 className="font-bold">
                    <Link
                      href={`/movie/${id}`}
                      className="text-gray-300 transition-colors hover:text-blue-700"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="font-montserrat">
                    {`${monthName} ${day}, ${year}`}
                  </p>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
};

export default MovieList;
