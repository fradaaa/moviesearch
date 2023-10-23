import { TVSeries } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";

type TVSeriesExtrasProps = {
  item: TVSeries;
  showNetworks?: boolean;
};

const TVSeriesExtras = ({ item, showNetworks }: TVSeriesExtrasProps) => {
  const { number_of_seasons, number_of_episodes, networks } = item;

  return (
    <div className="mt-4">
      <div className="flex gap-4">
        <p className="text-gray-400">
          <span className="font-bold text-white">Seasons:</span>{" "}
          {number_of_seasons}
        </p>
        <p className="text-gray-400">
          <span className="font-bold text-white">No. of episodes:</span>{" "}
          {number_of_episodes}
        </p>
      </div>
      {showNetworks && (
        <div className="mt-2 flex gap-2 rounded-md bg-gray-800 p-4">
          {networks.map(({ id, logo_path, name }) => {
            const src = getImageURL.getLogo(logo_path, "w154");

            return (
              <div key={id} title={name}>
                {src ? (
                  <Image src={src} alt={name} width={50} height={30} />
                ) : (
                  <p>{name}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TVSeriesExtras;
