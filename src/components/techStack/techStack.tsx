import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import classes from "./techStack.module.css";

const fallbackVariants = [
  "original",
  "plain",
  "wordmark",
  "original-wordmark",
  "placeholder",
];

const TechStack = () => {
  const { selectedTechStack } = useSelector((s: RootState) => s.input);

  const handleError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    tech: string
  ) => {
    const img = e.currentTarget;
    const current = fallbackVariants.find((v) => img.src.includes(`-${v}.svg`));
    const nextIndex = fallbackVariants.indexOf(current ?? "original") + 1;

    if (nextIndex < fallbackVariants.length) {
      img.src = `/icons/${tech}/${tech}-${fallbackVariants[nextIndex]}.svg`;
    } else {
      img.onerror = null; // stop infinite loop
      img.src = "/icons/placeholder.svg";
    }
  };

  return (
    <>
      {selectedTechStack.map((tech) => (
        <img
          key={tech}
          src={`/icons/${tech}/${tech}-original.svg`}
          alt={tech}
          className={classes.icon}
          loading="lazy"
          onError={(e) => handleError(e, tech)}
        />
      ))}
    </>
  );
};

export default TechStack;
