import {
  Movie,
  MovieCastResult,
  MovieCrewResult,
  MovieImages,
  MovieSearchResult,
  Person,
} from "./types";

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
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`,
  );

export const getMovieList = async (
  type: "popular" | "top_rated" | "upcoming",
) => {
  const { results } = await getData<{ results: MovieSearchResult[] }>(
    `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
  );

  return results;
};

export const getMovieImages = async (id: string, language = "") => {
  const data = await getData<MovieImages>(
    `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en,null`,
  );

  return data;
};

export const getPerson = async (id: string) => {
  const data = await getData<Person>(
    `https://api.themoviedb.org/3/person/${id}?language=en-US`,
  );

  return data;
};

export const getPersonMovieCredits = async (id: string) => {
  const data = await getData<{ cast: MovieSearchResult[] }>(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`,
  );

  return data.cast.filter(({ vote_count }) => vote_count >= 2000);
};

type PersonCredits = {
  ["Acting"]: MovieCastResult[];
} & {
  [k: string]: MovieCrewResult[];
};

export const getPersonCombinedCredits = async (id: string) => {
  const { cast, crew } = await getData<{
    cast: MovieCastResult[];
    crew: MovieCrewResult[];
  }>(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
  );

  const data: PersonCredits = { Acting: [] };

  cast
    .map((credit) => ({
      ...credit,
      release_date: credit.first_air_date || credit.release_date,
    }))
    .sort((a, b) =>
      (b.release_date as unknown as string).localeCompare(
        a.release_date as unknown as string,
      ),
    )
    .forEach((credit) => data["Acting"].push(credit));

  crew.forEach((credit) => {
    if (!data[credit.department]) data[credit.department] = [];

    data[credit.department].push(credit);
  });

  return data;
};
