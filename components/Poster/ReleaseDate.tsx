import { formatDate } from "@/utils/formatDate";

type ReleaseDateProps = {
  release_date: Date;
};

const ReleaseDate = ({ release_date }: ReleaseDateProps) => {
  const { year, monthName, day } = formatDate(release_date);
  return (
    <div className="absolute -left-20 top-20 flex select-none flex-col items-center rounded-sm bg-sky-600 p-4 text-white">
      <p className="font-montserrat text-5xl font-bold">{day}</p>
      <p className="font-montserrat mt-5 text-xl">{`${monthName} ${year}`}</p>
    </div>
  );
};

export default ReleaseDate;
