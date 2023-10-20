import { Movie, MovieSearchResult } from "@/types";

export const isMovie = (item: any): item is Movie => item.title !== undefined;

export const isMovieSearchResult = (item: any): item is MovieSearchResult =>
  item.title !== undefined;
