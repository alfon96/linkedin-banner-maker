import { useState } from "react";
import { techDisplayNames } from "./techStackInputMap";
import classes from "./TechStackInput.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addTechToStack,
  setTechBlock,
  resetTechBlock,
  removeTechFromStack,
} from "../../../inputSlice";

const TechStackInput = () => {
  const dispatch = useDispatch();
  const { selectedTechStack, techBlock } = useSelector(
    (s: RootState) => s.input
  );
  const [query, setQuery] = useState("");

  const handleAdd = (tech: string) => {
    if (selectedTechStack.includes(tech)) return;
    if (selectedTechStack.length + 1 === 12) dispatch(setTechBlock());
    dispatch(addTechToStack(tech));
    setQuery("");
  };

  const results = Object.entries(techDisplayNames).filter(([key, value]) =>
    value.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={classes.techStackInputCnt}>
      <label htmlFor="techSearch">Your Tech Stack</label>
      <input
        id="techSearch"
        type="text"
        className={classes.searchInput}
        placeholder="Select up to 12 technologies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={techBlock}
      />
      {query && !techBlock && (
        <div className={classes.dropdown}>
          {results.map(([key, value]) => (
            <button
              key={key}
              className={classes.dropdownItem}
              onClick={() => handleAdd(key)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      <div className={classes.techPillsCnt}>
        {selectedTechStack.map((tech) => (
          <button
            className={classes.techPill}
            key={tech}
            onClick={() => {
              dispatch(removeTechFromStack(tech));
              dispatch(resetTechBlock());
            }}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TechStackInput;
