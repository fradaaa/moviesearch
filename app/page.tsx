import MovieList from "@/components/MovieList";

const listTypes = ["popular", "top_rated", "upcoming"] as const;

export default function Home() {
  return listTypes.map((type) => <MovieList key={type} type={type} />);
}
