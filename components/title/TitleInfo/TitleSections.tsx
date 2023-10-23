import { Dispatch, SetStateAction } from "react";

type TitleSectionType = "Cast" | "Images";

type TitleSectionsProps = {
  selectedSection: TitleSectionType;
  setSelectedSection: Dispatch<SetStateAction<TitleSectionType>>;
};

const TitleSections = ({
  selectedSection,
  setSelectedSection,
}: TitleSectionsProps) => {
  const titleSections: TitleSectionType[] = ["Cast", "Images"];
  const borderColor = (section: string) => {
    return section === selectedSection
      ? "border-blue-700"
      : "border-blue-300/50";
  };

  return (
    <div className="flex max-w-min items-stretch">
      {titleSections.map((text) => (
        <h2
          key={text}
          className={`border-b-4 text-xl font-bold text-blue-400 transition-colors hover:text-blue-600 ${borderColor(
            text,
          )}`}
        >
          <button
            type="button"
            className="p-6"
            onClick={() => setSelectedSection(text)}
          >
            {text}
          </button>
        </h2>
      ))}
    </div>
  );
};

export default TitleSections;
