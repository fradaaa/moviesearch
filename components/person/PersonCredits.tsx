import { getPersonCombinedCredits } from "@/api";
import { formatDate } from "@/utils/formatDate";
import { getRatingColor } from "@/utils/getRatingColor";
import Link from "next/link";

type PersonCreditsProps = {
  id: string;
};

const PersonCredits = async ({ id }: PersonCreditsProps) => {
  const data = await getPersonCombinedCredits(id);

  return (
    <div className="mt-10">
      <ul>
        {data.Acting.map(
          ({
            id,
            title,
            vote_average,
            vote_count,
            release_date,
            character,
            media_type,
            name,
            credit_id,
            episode_count,
          }) => {
            const { year } = formatDate(release_date);
            const [_, rColor] = getRatingColor(vote_average);

            return (
              <li key={credit_id} className="flex p-2">
                <div>
                  <Link
                    href={`/${media_type}/${id}`}
                    className="text-lg transition-colors hover:text-blue-700"
                  >
                    <p className="font-bold">
                      {isMovie(media_type) ? title : name},{" "}
                      <span className="font-montserrat text-base font-normal ">
                        {year}
                      </span>
                    </p>
                  </Link>
                  <p className="text-gray-200">
                    {character}
                    <span className="text-sm text-gray-400">
                      {episode_count && `, ${episode_count} episode(s)`}
                    </span>
                  </p>
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
          },
        )}
      </ul>
    </div>
  );
};

const isMovie = (type: string) => type === "movie";

export default PersonCredits;
