import { CrewCredit, Movie, TVSeries } from "@/types";
import { isMovie } from "@/utils/typeHelpers";

export const convertRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - hours * 60;

  return `${hours ? `${hours}h` : ""}${minutes}m`;
};

export const getDirectorAndWriter = (crew: CrewCredit[]) => {
  const arr = [...crew].sort((a, b) => b.popularity - a.popularity);
  const director =
    arr.find(({ job }) => job === "Director") ||
    arr.find(
      ({ known_for_department }) =>
        known_for_department === "Creator" ||
        known_for_department === "Production",
    );
  const writer =
    arr.find(({ job }) => job === "Screenplay" || job === "Writer") ||
    arr.find(({ known_for_department }) => known_for_department === "Writing");

  return [director, writer] as const;
};

export const getRuntime = (item: Movie | TVSeries) => {
  if (isMovie(item)) {
    return convertRuntime(item.runtime);
  } else {
    if (item.episode_run_time[0]) {
      return convertRuntime(item.episode_run_time[0]);
    }

    return "";
  }
};
