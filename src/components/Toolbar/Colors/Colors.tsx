import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import classes from "./Colors.module.css";
import { setColorPair } from "../../../inputSlice";
import { useState } from "react";

const Colors = () => {
  const dispatch = useDispatch();
  const { colorTheme: colorPairs, selected } = useSelector(
    (s: RootState) => s.input
  );

  return (
    <div className={classes.toolbarCnt}>
      <label htmlFor="colorPicker">Color Theme</label>
      <select
        id="colorPicker"
        title="color-picker"
        value={selected}
        onChange={(e) => dispatch(setColorPair(Number(e.target.value)))}
        className={classes.select}
      >
        {colorPairs.map(([, , , name], i) => (
          <option key={i} value={i}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Colors;
