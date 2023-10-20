import { getPerson, getPersonCredits } from "@/api";
import { getImageURL } from "@/utils/getImageURL";
import { isMovieSearchResult } from "@/utils/typeHelpers";
import Image from "next/image";
import Link from "next/link";

type PersonBiographyProps = {
  id: string;
};

const PersonBiography = async ({ id }: PersonBiographyProps) => {
  const { name, biography } = await getPerson(id);
  const knownForMovies = await getPersonCredits(id);

  return (
    <section className="w-full">
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="mt-8">
        <h2 className="font-bold">Biography</h2>
        <div className="relative max-h-60 overflow-hidden">
          {biography
            ? biography
                .split("\n")
                .filter((t) => t)
                .map((text, i) => (
                  <p key={i} className="mt-6 text-sm">
                    {text}
                  </p>
                ))
            : "—"}
          {biography && (
            <button
              type="button"
              className="ransition-colors absolute bottom-3 right-3 rounded-md text-blue-700 hover:text-blue-500"
            >
              Read More
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 w-full">
        <h3 className="text-md mb-2 font-bold">Known For</h3>
        <ul className="flex w-auto flex-nowrap gap-4 overflow-x-scroll pb-6">
          {knownForMovies.map((knownMovie) => {
            const { id, poster_path, media_type } = knownMovie;
            const src = getImageURL.getPoster(poster_path, "w185");
            const title = isMovieSearchResult(knownMovie)
              ? knownMovie.title
              : knownMovie.name;

            return (
              <li key={id}>
                <Link href={`/${media_type}/${id}`} className="block w-[130px]">
                  <Image
                    src={src}
                    alt={title}
                    width={130}
                    height={195}
                    className="rounded-md"
                  />
                </Link>
                <p className="text-center text-sm transition-colors hover:text-blue-700">
                  <Link
                    href={`/${media_type}/${id}`}
                    className="inline-block w-full"
                  >
                    {title}
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PersonBiography;
