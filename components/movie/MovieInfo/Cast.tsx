import { CastCredit } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";

type CastProps = {
  cast: CastCredit[];
  id: string;
};

const Cast = ({ cast, id }: CastProps) => {
  const showCount = 7;

  return (
    <div className="mt-6">
      <h2 className="font-bold uppercase">The Cast</h2>
      <div className="mt-2 flex gap-2">
        {cast
          .filter(({ order }) => order < showCount)
          .map((item, i) => (
            <CastItem
              key={item.id}
              item={item}
              total={cast.length}
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
  item: { name, profile_path },
  total,
  movieId,
  isLast,
}: CastItemProps) => {
  const src = getImageURL.getProfile(profile_path, "w185");

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full drop-shadow-md">
      <Image src={src} alt={name} width={100} height={100} />
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
