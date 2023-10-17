import { MovieSearchResult, PersonSearchResult, SearchData } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div
      className="absolute top-full mt-2 w-full rounded-md bg-gray-800 shadow-xl"
      onClick={hideResults}
    >
      {isLoading && query ? (
        <div className="flex h-32 items-center justify-center">
          <svg
            className="-ml-1 mr-3 h-10 w-10 animate-spin text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        results &&
        results.length > 0 && (
          <div className="p-2">
            {results.map((result) => (
              <div key={result.type} className="mt-4">
                <p className="pb-2 pl-2 text-sm capitalize">{`${result.type}s`}</p>
                <ul className="flex flex-col gap-2">
                  {result.items.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
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
        <Link href="/">
          <Image src={src} alt={item.name} width={48} height={72} />
          <h4>{item.name}</h4>
        </Link>
      )}
    </li>
  );
};

const isMovie = (item: any): item is MovieSearchResult =>
  item.title !== undefined;

export default SearchResults;
