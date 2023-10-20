"use client";

import { CastCredit, TitleImages as TitleImagesType } from "@/types";
import { useState } from "react";
import TitleCast from "./TitleCast";
import TitleImages from "./TitleImages";
import TitleSections from "./TitleSections";

type TitleSectionType = "Cast" | "Images";

type TitleDetailsProps = {
  images: TitleImagesType;
  cast: CastCredit[];
};

const TitleDetails = ({ images, cast }: TitleDetailsProps) => {
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
          <TitleCast cast={cast} />
        ) : (
          <TitleImages images={images} />
        )}
      </div>
    </section>
  );
};

export default TitleDetails;
