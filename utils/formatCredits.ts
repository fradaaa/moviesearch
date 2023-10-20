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
  const data: PersonCredits = { Acting: formatCast(cast) };

  const sortFunction = (a: Cast | Crew, b: Cast | Crew) =>
    sortString(b).localeCompare(sortString(a));

  crew.forEach((credit) => {
    if (!data[credit.department]) data[credit.department] = [];

    data[credit.department].push(credit);
  });

  Object.values(data).forEach((arr) => arr.sort(sortFunction));

  return data;
};

const sortString = (item: Cast | Crew) => {
  return isMovieSearchRes(item)
    ? item.release_date.toString()
    : item.first_air_date.toString();
};

const formatCast = (cast: Cast[]) => {
  const seen: { [k: string]: TVCastResult } = {};
  const res: Cast[] = [];

  cast.forEach((credit) => {
    if (isMovieSearchRes(credit)) {
      res.push(credit);
    } else {
      if (!seen[credit.id]) {
        seen[credit.id] = { ...credit };
        seen[credit.id].roles = [];
      }

      const role = {
        credit_id: credit.credit_id,
        character: credit.character,
        episode_count: credit.episode_count,
      };

      seen[credit.id].roles.push(role);
    }
  });

  Object.values(seen).forEach((credit) => res.push(credit));

  return res;
};

const isMovieSearchRes = (credit: any): credit is MovieSearchResult =>
  credit.title !== undefined;
