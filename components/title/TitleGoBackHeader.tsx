import { formatDate } from "@/utils/formatDate";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

type TitleGoBackHeaderProps = {
  poster_path: string;
  title: string;
  release_date: Date;
  id: string;
  type: "movie" | "tv";
};

const TitleGoBackHeader = ({
  poster_path,
  title,
  release_date,
  id,
  type,
}: TitleGoBackHeaderProps) => {
  const src = getImageURL.getPoster(poster_path, "w342");
  const { year } = formatDate(release_date);

  return (
    <header className="mt-6 flex items-center border-b-2 border-b-gray-800 pb-4">
      <Image
        src={src}
        className="rounded-md"
        alt={title}
        width={125}
        height={175}
      />
      <div className="ml-8">
        <h1 className="mb-4 text-3xl font-bold">
          <Link
            href={`/movie/${id}`}
            className="transition-colors hover:text-blue-600"
          >
            {title}
          </Link>{" "}
          <span className="font-normal text-gray-400">({year})</span>
        </h1>
        <Link
          href={`/${type}/${id}`}
          className="flex items-center font-bold text-gray-300 transition-colors hover:text-blue-600"
        >
          <LuArrowLeft className="mr-2" /> Back to movie
        </Link>
      </div>
    </header>
  );
};

export default TitleGoBackHeader;
