"use client";

import { TitleImages } from "@/types";
import { getImageURL } from "@/utils/getImageURL";
import Image from "next/image";
import { CSSProperties, useState } from "react";

type TitleImagesProps = {
  images: TitleImages;
};

type ImagesType = keyof Omit<TitleImages, "id">;

const TitleImages = ({ images }: TitleImagesProps) => {
  const [imagesType, setImagesType] = useState<ImagesType>("backdrops");

  console.log(images);

  return (
    <>
      <div className="flex gap-6">
        {["Backdrops", "Posters"].map((text, i) => (
          <button
            key={text}
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
            key={i}
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

export default TitleImages;
