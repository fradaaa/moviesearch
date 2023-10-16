import { MovieSearchResult, PersonSearchResult, SearchData } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type SearchResultsProps = {
  isLoading: boolean;
  query: string;
  results?: SearchData[];
};

const SearchResults = ({ isLoading, query, results }: SearchResultsProps) => {
  return (
    <div className="absolute top-full z-10 mt-2 w-full rounded-md bg-black shadow-xl">
      {isLoading && query ? (
        <div className="h-10 w-full p-2 text-center">Loading...</div>
      ) : (
        results &&
        results.length > 0 && (
          <div className="p-4">
            {results.map((result) => (
              <div key={result.type} className="mt-4">
                <p className="pb-2 text-sm capitalize">{`${result.type}s`}</p>
                <div className="flex flex-col gap-2">
                  {result.items.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
                </div>
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
    <div className="flex items-center gap-4">
      {isMovie(item) ? (
        <>
          <Image src={src} alt={item.title} width={48} height={72} />
          <div>
            <h4 className="font-bold">{item.title}</h4>
            <p className="text-xs">{`${item.original_title}, ${new Date(
              item.release_date,
            ).getFullYear()}`}</p>
          </div>
        </>
      ) : (
        <>
          <Image src={src} alt={item.name} width={48} height={72} />
          <h4>{item.name}</h4>
        </>
      )}
    </div>
  );
};

const isMovie = (item: any): item is MovieSearchResult =>
  item.title !== undefined;

export default SearchResults;
