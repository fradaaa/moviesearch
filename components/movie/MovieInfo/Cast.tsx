import { CastCredit } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type CastProps = {
  cast: CastCredit[];
};

const Cast = ({ cast }: CastProps) => {
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
            />
          ))}
      </div>
    </div>
  );
};

type CastItemProps = {
  item: CastCredit;
  total: number;
  isLast?: boolean;
};

const CastItem = ({
  item: { name, profile_path },
  total,
  isLast,
}: CastItemProps) => {
  const src = getImageURL.getProfile(profile_path, "w185");

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full drop-shadow-md">
      <Image src={src} alt={name} width={100} height={100} />
      {isLast && (
        <div className="absolute top-0 flex h-full w-full cursor-pointer items-center bg-gray-600/75  text-center">
          <span className="w-full select-none">+{total}</span>
        </div>
      )}
    </div>
  );
};

export default Cast;
