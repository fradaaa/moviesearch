"use client";

import { CastCredit, TitleImages as TitleImagesType } from "@/types";
import { useState } from "react";
import TitleCast from "./TitleCast";
import TitleImages from "./TitleImages";
import TitleSections from "./TitleSections";

type TitleSectionType = "Cast" | "Images";

type TitleInfoProps = {
  images: TitleImagesType;
  cast: CastCredit[];
  id: string;
  type: "movie" | "tv";
};

const TitleInfo = ({ images, cast, id, type }: TitleInfoProps) => {
  const [selectedSection, setSelectedSection] =
    useState<TitleSectionType>("Cast");

  return (
    <section className="mt-10">
      <TitleSections
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className="mt-6">
        {selectedSection === "Cast" ? (
          <TitleCast cast={cast} id={id} type={type} />
        ) : (
          <TitleImages images={images} />
        )}
      </div>
    </section>
  );
};

export default TitleInfo;
