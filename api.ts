import { Movie } from "./types";

const getData = async <T>(url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  });
  const data = (await res.json()) as T;

  return data;
};

export const getMovie = async (movieId = "274") =>
  getData<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
  );
