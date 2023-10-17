type RatingColor = [bg: string, text: string];

export const getRatingColor = (vote_average: number): RatingColor => {
  if (vote_average < 5) return ["bg-red-600", "text-red-600"];

  if (vote_average < 7) return ["bg-gray-500", "text-gray-500"];

  return ["bg-green-600", "text-green-600"];
};
