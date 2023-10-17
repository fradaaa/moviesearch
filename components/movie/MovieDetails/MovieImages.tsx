"use client";

import { MovieImages } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import { CSSProperties, useState } from "react";

type MovieImagesProps = {
  images: MovieImages;
};

type ImagesType = keyof Omit<MovieImages, "id">;

const MovieImages = ({ images }: MovieImagesProps) => {
  const [imagesType, setImagesType] = useState<ImagesType>("backdrops");

  return (
    <>
      <div className="flex gap-6">
        {["Backdrops", "Posters"].map((text, i) => (
          <button
            key={i}
            type="button"
            className="rounded-md bg-blue-700 p-4 font-bold transition-colors hover:bg-blue-500"
            onClick={() => setImagesType(text.toLowerCase() as ImagesType)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-5 gap-4">
        {images[imagesType].map(({ file_path, width, height }, i) => (
          <Image
            key={file_path}
            className="h-full rounded-md"
            src={getImageURL.getBackdrop(file_path, "w780")}
            alt="Image"
            width={width}
            height={height}
            style={spanSquare(i + 1)}
          />
        ))}
      </div>
    </>
  );
};

const spanSquare = (n: number, period = 13): CSSProperties => {
  return n % period == 2 ||
    n % period === 6 ||
    n % period === 10 ||
    n % period === 12
    ? { gridColumn: "span 2", gridRow: "span 2" }
    : {};
};

export default MovieImages;
