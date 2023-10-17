"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";
import {
  ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchResults from "./SearchResults";

const queryClient = new QueryClient();

const HeaderSearch = () => {
  const node = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [hideResults, setHideResults] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const debouncedQuery = useDebounce(query, 1000);

  const { isLoading, error, data } = useSearch(debouncedQuery);

  const handleOutsideClick = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) return;

    setHideResults(true);
  };

  useEffect(() => {
    if (!hideResults) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [hideResults]);

  return (
    <div ref={node} className="relative">
      <input
        className="w-80 rounded-md bg-gray-700 p-1 px-3 text-gray-200"
        type="search"
        name="search"
        id="search"
        placeholder="Movies, tv-series, people"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
