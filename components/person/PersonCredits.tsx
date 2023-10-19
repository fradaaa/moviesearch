"use client";

import { PersonCredits as PersonCreditsType } from "@/types";
import { useState } from "react";
import PersonCreditItem from "./PersonCreditItem";

type PersonCreditsProps = {
  id: string;
  known_for_department: string;
  credits: PersonCreditsType;
};

const PersonCredits = ({
  known_for_department,
  credits,
}: PersonCreditsProps) => {
  const [curDepartment, setCurDepartment] =
    useState<string>(known_for_department);
  const depsInfo = Object.keys(credits).map(
    (dep) => [dep, credits[dep].length] as const,
  );
  const borderColor = (section: string) => {
    return section === curDepartment ? "border-blue-700" : "border-blue-300/50";
  };

  return (
    <div className="mt-10">
      <div className="flex ">
        {depsInfo.map(([dep, qty]) => (
          <button
            key={dep}
            type="button"
            className={`flex flex-col gap-1 border-b-2 p-4 transition-colors hover:text-blue-700 ${borderColor(
              dep,
            )}`}
            onClick={() => setCurDepartment(dep)}
          >
            <span className="text-lg font-bold">{dep}</span>
            <span className="text-sm ">{qty} movies</span>
          </button>
        ))}
      </div>
      <ul className="mt-4">
        {credits[curDepartment].map((credit) => (
          <PersonCreditItem key={credit.credit_id} item={credit} />
        ))}
      </ul>
    </div>
  );
};

export default PersonCredits;
