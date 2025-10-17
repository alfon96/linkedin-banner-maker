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
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedTechStack.length + 1 === 12) {
      dispatch(setTechBlock());
    }

    dispatch(addTechToStack(e.target.value));
  };

  return (
    <div className={classes.techStackInputCnt}>
      <select
        className={classes.selectCnt}
        aria-label="tech-stack"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleOnChange(e)
        }
        disabled={techBlock}
      >
        {Object.entries(techDisplayNames).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div className={classes.techPillsCnt}>
        {[...selectedTechStack].map((tech) => (
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
