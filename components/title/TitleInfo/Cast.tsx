import { CastCredit } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";

type CastProps = {
  cast: CastCredit[];
  id: string;
  castLength: number;
};

const Cast = ({ cast, id, castLength }: CastProps) => {
  const showCount = 7;

  console.log(castLength);

  return (
    <div className="mt-6">
      <h2 className="font-bold uppercase">The Cast</h2>
      <div className="mt-2 flex gap-2">
        {[...cast.slice(0, 7)].map((item, i) => (
          <CastItem
            key={item.id}
            item={item}
            total={castLength}
            isLast={showCount - 1 === i}
            movieId={id}
          />
        ))}
      </div>
    </div>
  );
};

type CastItemProps = {
  item: CastCredit;
  total: number;
  movieId: string;
  isLast?: boolean;
};

const CastItem = ({
  item: { name, profile_path, id },
  total,
  movieId,
  isLast,
}: CastItemProps) => {
  const src = getImageURL.getProfile(profile_path, "w185");

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full drop-shadow-md">
      <Link
        href={`/person/${id}`}
        className="transition-opacity hover:opacity-70"
        title={name}
      >
        <Image src={src} alt={name} width={100} height={100} />
      </Link>
      {isLast && (
        <div className="absolute top-0 h-full w-full cursor-pointer bg-gray-600/75 text-center transition-colors hover:bg-gray-600/50">
          <Link
            href={`/movie/${movieId}/cast`}
            className="flex h-full w-full items-center"
          >
            <span className="w-full select-none">+{total}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cast;
