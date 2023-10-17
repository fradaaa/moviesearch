"use client";

import { CastCredit } from "@/types";
import { useState } from "react";
import MovieCast from "./MovieCast";
import MovieImages from "./MovieImages";
import MovieSections from "./MovieSections";

type MovieSectionType = "Cast" | "Images";

type MovieDetailsProps = {
  images: MovieImages;
  cast: CastCredit[];
};

const MovieDetails = ({ images, cast }: MovieDetailsProps) => {
  const [selectedSection, setSelectedSection] =
    useState<MovieSectionType>("Cast");

  return (
    <section className="mt-10">
      <MovieSections
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className="mt-6">
        {selectedSection === "Cast" ? (
          <MovieCast cast={cast} />
        ) : (
          <MovieImages images={images} />
        )}
      </div>
    </section>
  );
};

export default MovieDetails;
