import { Movie } from "@/types";

export const isMovie = (item: any): item is Movie => item.title !== undefined;
