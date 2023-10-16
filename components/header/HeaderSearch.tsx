"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";
import { ReactNode, useDeferredValue, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchResults from "./SearchResults";

const queryClient = new QueryClient();

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [hideResults, setHideResults] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const debouncedQuery = useDebounce(query, 1000);

  const { isLoading, error, data } = useSearch(debouncedQuery);

  return (
    <div className="relative">
      <input
        className="w-80 rounded-md p-1 text-black"
        type="search"
        name="search"
        id="search"
        placeholder="Movies, tv-series, people"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setHideResults(true)}
        onFocus={() => setHideResults(false)}
      />
      {!hideResults && (
        <SearchResults
          isLoading={isLoading}
          query={deferredQuery}
          results={data}
        />
      )}
    </div>
  );
};

export const QuerySearchProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default HeaderSearch;
