import classes from "./TextData.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setFontSize, setFullName, setJobTitle } from "../../../inputSlice";

const TextData = () => {
  const dispatch = useDispatch();
  const { fullName, jobTitle, textFontSize } = useSelector(
    (s: RootState) => s.input
  );

  return (
    <div className={classes.textDataCnt}>
      <label htmlFor="full-name">Full Name</label>
      <input
        className={classes.inputEl}
        id={"full-name"}
        aria-label="name"
        value={fullName}
        onChange={(e) => dispatch(setFullName(e.target.value))}
      ></input>
      <label htmlFor="job-title">Job Title</label>
      <input
        className={classes.inputEl}
        id={"job-title"}
        aria-label="job-title"
        value={jobTitle}
        onChange={(e) => dispatch(setJobTitle(e.target.value))}
      ></input>
      <label htmlFor="font-size">Font Size</label>
      <input
        className={classes.inputEl}
        id="font-size"
        type="number"
        min={1.5}
        max={3}
        step={0.25}
        onChange={(e) => dispatch(setFontSize(parseFloat(e.target.value)))}
        value={textFontSize}
      ></input>
    </div>
  );
};

export default TextData;
