import { MovieSearchResult, PersonSearchResult, SearchData } from "@/types";
import { QueryFunction, useQuery } from "react-query";

type SearchResponse = {
  page: number;
  results: MovieSearchResult[] | PersonSearchResult[];
  total_pages: number;
  total_results: number;
};

const fetchSearch: QueryFunction<
  SearchData[],
  ["searchResults", string]
> = async ({ queryKey }) => {
  const [_, query] = queryKey;

  if (!query) return [];

  const searchTypes = ["movie", "person"] as const;
  const res = await Promise.all(
    searchTypes.map((type) =>
      fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzg1NTVjOTg3MTRiNjVkMWRkN2I1ODA4YWZiNDRjZSIsInN1YiI6IjY1MmI5NzRmZWE4NGM3MDEyZDcwMTYyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i52l9t_wPhlPpV7rgCWIylCsERF7NrVocpFXOKzRQck",
          },
        },
      ),
    ),
  );
  const data = await Promise.all<SearchResponse>(res.map((r) => r.json()));

  return convertSearchData(data).map(
    (items, i) =>
      ({
        type: searchTypes[i],
        items,
      }) as SearchData,
  );
};

const convertSearchData = (data: SearchResponse[]) => {
  return data
    .map((d) => d.results)
    .map((r) => r.sort((a, b) => b.popularity - a.popularity))
    .map((r) => r.filter((item) => hasImage(item)).slice(0, 3));
};

const hasImage = (item: MovieSearchResult | PersonSearchResult) => {
  if (isMovie(item)) return item.poster_path;

  return item.profile_path;
};

const isMovie = (item: any): item is MovieSearchResult =>
  item.title !== undefined;

export const useSearch = (query: string) =>
  useQuery(["searchResults", query], fetchSearch);
