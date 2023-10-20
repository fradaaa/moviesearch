import { Credit, MovieCrewResult, TVCastResult, TVCrewResult } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getRatingColor } from "@/utils/getRatingColor";
import Link from "next/link";

type PersonCreditItemProps = {
  item: Credit;
};

const PersonCreditItem = ({ item }: PersonCreditItemProps) => {
  const { id, vote_average, media_type, vote_count } = item;
  const rDate = isTv(item) ? item.first_air_date : item.release_date;
  const { year } = formatDate(rDate);
  const [_, rColor] = getRatingColor(vote_average);

  return (
    <li className="flex rounded-md p-2 transition-colors hover:bg-gray-700">
      <div>
        <Link
          href={`/${media_type}/${id}`}
          className="text-lg transition-colors hover:text-blue-700"
        >
          <p className="font-bold">
            {isTv(item) ? item.name : item.title},{" "}
            <span className="font-montserrat text-base font-normal ">
              {year ? year : "—"}
            </span>
          </p>
        </Link>
        <div className="pl-2">
          {isTv(item) ? (
            isCrew(item) ? (
              <p className="text-gray-200">{item.job}</p>
            ) : (
              item.roles.map((item) => (
                <p key={item.credit_id} className="mt-1 text-gray-200">
                  {item.character}
                  <span className="text-sm text-gray-400">
                    , {item.episode_count} episode(s)
                  </span>
                </p>
              ))
            )
          ) : (
            <p className="text-gray-200">
              {isCrew(item) ? item.job : item.character}
            </p>
          )}
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end justify-center font-montserrat">
        {vote_count > 0 ? (
          <>
            <span className={`block text-lg font-bold ${rColor}`}>
              {vote_average.toFixed(1)}
            </span>
            <span className="block text-sm">{vote_count}</span>
          </>
        ) : (
          <span>—</span>
        )}
      </div>
    </li>
  );
};

const isTv = (credit: any): credit is TVCastResult | TVCrewResult =>
  credit.media_type === "tv";

const isCrew = (credit: any): credit is MovieCrewResult | TVCrewResult =>
  credit.job !== undefined;

export default PersonCreditItem;
