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
import { LuSearch } from "react-icons/lu";

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
      <label htmlFor="search" className="relative">
        <input
          className="w-80 rounded-md border-2 border-transparent bg-gray-700 p-1 px-3 pr-10 text-gray-200 outline-none placeholder:italic focus:border-2 focus:border-blue-700"
          type="search"
          name="search"
          id="search"
          placeholder="Movies, tv-series, people"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setHideResults(false)}
        />
        <LuSearch className="absolute right-2 top-2/4 h-6 w-6 -translate-y-2/4" />
      </label>
      {!hideResults && (
        <SearchResults
          isLoading={isLoading}
          query={deferredQuery}
          results={data}
          hideResults={() => setHideResults(true)}
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
