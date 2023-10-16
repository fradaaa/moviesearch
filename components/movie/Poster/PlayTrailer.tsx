import { LuPlay } from "react-icons/lu";

const PlayTrailer = () => {
  return (
    <button
      type="button"
      className="absolute -right-9 bottom-20 cursor-pointer rounded-sm bg-sky-600 p-4 text-4xl text-white"
    >
      <LuPlay aria-hidden="true" />
      <p className="sr-only">Play trailer</p>
    </button>
  );
};

export default PlayTrailer;
