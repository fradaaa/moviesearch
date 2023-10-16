export const getRatingColor = (vote_average: number) => {
  if (vote_average < 5) return "bg-red-600";

  if (vote_average < 7) return "bg-gray-500";

  return "bg-green-600";
};
