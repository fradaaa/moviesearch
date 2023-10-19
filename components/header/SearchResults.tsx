import { MovieSearchResult, PersonSearchResult, SearchData } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";
import Circle from "./Circle";

type SearchResultsProps = {
  isLoading: boolean;
  query: string;
  results?: SearchData[];
  hideResults: () => void;
};

const SearchResults = ({
  isLoading,
  query,
  results,
  hideResults,
}: SearchResultsProps) => {
  const searchResultsCount = results?.reduce<number>(
    (a, v) => a + v.items.length,
    0,
  );

  return (
    <div
      className="absolute top-full mt-2 w-full rounded-md bg-gray-800 shadow-xl"
      onClick={hideResults}
    >
      {isLoading && query ? (
        <div className="flex h-32 items-center justify-center">
          <Circle />
        </div>
      ) : results && searchResultsCount ? (
        <div className="p-2">
          {results.map((result) =>
            result.items.length > 1 ? (
              <div key={result.type} className="mt-4">
                <p className="pb-2 pl-2 text-sm capitalize">{`${result.type}s`}</p>
                <ul className="flex flex-col gap-2">
                  {result.items.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            ) : null,
          )}
        </div>
      ) : (
        <p className="p-4 text-sm">Nothing has been found...</p>
      )}
    </div>
  );
};

type SearchResultItemProps = {
  item: MovieSearchResult | PersonSearchResult;
};

const SearchResultItem = ({ item }: SearchResultItemProps) => {
  const src = isMovie(item)
    ? getImageURL.getPoster(item.poster_path, "w185")
    : getImageURL.getProfile(item.profile_path, "original");

  return (
    <li>
      {isMovie(item) ? (
        <Link
          className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-gray-600"
          href={`/movie/${item.id}`}
        >
          <Image
            className="rounded-sm"
            src={src}
            alt={item.title}
            width={48}
            height={72}
          />
          <div>
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-xs text-gray-300">{`${
              item.original_title
            }, ${new Date(item.release_date).getFullYear()}`}</p>
          </div>
        </Link>
      ) : (
        <Link
          href={`/person/${item.id}`}
          className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-gray-600"
        >
          <Image
            src={src}
            alt={item.name}
            width={48}
            height={72}
            className="rounded-sm"
          />
          <h4>{item.name}</h4>
        </Link>
      )}
    </li>
  );
};

const isMovie = (item: any): item is MovieSearchResult =>
  item.title !== undefined;

export default SearchResults;
