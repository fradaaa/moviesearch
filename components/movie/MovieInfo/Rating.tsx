import { LuStar } from "react-icons/lu";
import { CSSProperties } from "react";

type RatingProps = {
  vote_average: number;
};

const Rating = ({ vote_average }: RatingProps) => {
  return (
    <div className="mt-6 flex items-center gap-1 text-2xl text-orange-400">
      {new Array(5).fill("").map((_, i) => (
        <span className="relative cursor-pointer" key={i}>
          <LuStar className="relative stroke-[1.5]" />
          <span
            className="absolute top-0 overflow-hidden"
            style={getWidthStyle(vote_average, i + 1)}
          >
            <LuStar className="fill-orange-400 stroke-[1.5]" />
          </span>
        </span>
      ))}
      <p className="ml-2">{vote_average.toFixed(2)}</p>
    </div>
  );
};

const getWidthStyle = (
  vote_average: number,
  curStar: number,
): CSSProperties => {
  const stars = +(vote_average / 2).toFixed(2);

  if (stars > curStar) return {};

  return {
    width: `${(1 - (curStar - stars)) * 100}%`,
  };
};

export default Rating;
