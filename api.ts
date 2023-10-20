import {
  Movie,
  MovieCastResult,
  MovieCrewResult,
  MovieSearchResult,
  Person,
  TVCastCredit,
  TVCastResult,
  TVCrewCredit,
  TVCrewResult,
  TVSeries,
  TitleImages,
} from "./types";
import { formatCredits } from "./utils/formatCredits";

const getData = async <T>(url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  });
  const data = (await res.json()) as T;

  return data;
};

export const getMovie = async (movieId = "274") => {
  const data = await getData<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`,
  );

  data.credits.castLength = data.credits.cast.length;
  data.credits.cast = data.credits.cast.slice(0, 20);

  return data;
};

export const getMovieList = async (
  type: "popular" | "top_rated" | "upcoming",
) => {
  const { results } = await getData<{ results: MovieSearchResult[] }>(
    `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
  );

  return results;
};

export const getTitleImages = async (id: string, type: "movie" | "tv") => {
  const data = await getData<TitleImages>(
    `https://api.themoviedb.org/3/${type}/${id}/images?include_image_language=en,null`,
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

export const getPersonCombinedCredits = async (id: string) => {
  const { cast, crew } = await getData<{
    cast: (MovieCastResult | TVCastResult)[];
    crew: (MovieCrewResult | TVCrewResult)[];
  }>(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
  );

  return formatCredits(cast, crew);
};

export const getTV = async (id: string, includeAllCredits?: boolean) => {
  const data = await getData<TVSeries>(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=credits,videos`,
  );

  if (includeAllCredits) {
    const credits = await getTVCredits(id);
    data.credits = credits;

    return data;
  }

  return data;
};

export const getTVCredits = async (id: string) => {
  const data = await getData<{
    cast: TVCastCredit[];
    crew: TVCrewCredit[];
    castLength: number;
  }>(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`);

  data.castLength = data.cast.length;
  data.cast = data.cast.slice(0, 20);

  return data;
};
