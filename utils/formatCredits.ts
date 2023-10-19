import {
  MovieCastResult,
  MovieCrewResult,
  MovieSearchResult,
  PersonCredits,
  TVCastResult,
  TVCrewResult,
} from "@/types";

type Cast = MovieCastResult | TVCastResult;
type Crew = MovieCrewResult | TVCrewResult;

type FormatCredits = (cast: Cast[], crew: Crew[]) => PersonCredits;

export const formatCredits: FormatCredits = (cast, crew) => {
  const data: PersonCredits = { Acting: [] };

  const sortFunction = (a: Cast | Crew, b: Cast | Crew) =>
    sortString(b).localeCompare(sortString(a));

  cast.forEach((credit) => data["Acting"].push(credit));

  crew.forEach((credit) => {
    if (!data[credit.department]) data[credit.department] = [];

    data[credit.department].push(credit);
  });

  Object.values(data).forEach((arr) => arr.sort(sortFunction));

  return data;
};

const sortString = (item: Cast | Crew) => {
  return isMovie(item)
    ? item.release_date.toString()
    : item.first_air_date.toString();
};

const isMovie = (credit: any): credit is MovieSearchResult =>
  credit.title !== undefined;
