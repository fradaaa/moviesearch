import { CastCredit } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

type CastProps = {
  id: string;
  cast: CastCredit[];
  type: "movie" | "tv";
  showCount?: number;
};

const Cast = ({ id, cast, type, showCount = 6 }: CastProps) => {
  const titleCast = cast.slice(0, showCount);

  return (
    <div className="mt-6">
      <h2 className="font-bold uppercase">The Cast</h2>
      <div className="mt-2 flex gap-2">
        {titleCast.map((item) => (
          <CastItem key={item.credit_id} item={item} />
        ))}
        <CastItem item={cast[6]}>
          <div className="absolute top-0 h-full w-full cursor-pointer bg-gray-600/75 text-center transition-colors hover:bg-gray-600/50">
            <Link
              href={`/${type}/${id}/cast`}
              className="flex h-full w-full items-center"
            >
              <span className="w-full select-none">+{cast.length}</span>
            </Link>
          </div>
        </CastItem>
      </div>
    </div>
  );
};

type CastItemProps = {
  item: CastCredit;
};

const CastItem = ({
  item: { name, profile_path, id },
  children,
}: PropsWithChildren<CastItemProps>) => {
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
      {children}
    </div>
  );
};

export default Cast;
