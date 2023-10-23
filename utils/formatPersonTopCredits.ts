import {
  MovieCastResult,
  MovieCrewResult,
  TVCastResult,
  TVCrewResult,
} from "@/types";

type Credits =
  | (MovieCastResult | TVCastResult)[]
  | (MovieCrewResult | TVCrewResult)[];

export const formatPersonTopCredits = (credits: Credits) => {
  const seen: { [k: string]: true } = {};

  return credits
    .filter(
      ({ vote_count, vote_average }) => vote_count >= 2000 && vote_average >= 7,
    )
    .map((credit) => {
      if (seen[credit.id]) return null;

      seen[credit.id] = true;
      return credit;
    })
    .filter(
      (credit): credit is MovieCastResult | TVCastResult => credit !== null,
    )
    .sort((a, b) => b.vote_average - a.vote_average);
};
