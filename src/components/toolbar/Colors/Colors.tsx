import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import classes from "./Colors.module.css";
import { setColorPair } from "../../../inputSlice";

const Colors = () => {
  const dispatch = useDispatch();
  const { colorTheme: colorPairs, selected } = useSelector(
    (s: RootState) => s.input
  );

  return (
    <div className={classes.toolbarCnt}>
      {colorPairs.map(([left, right], i) => (
        <button
          key={i}
          className={`${classes.colorButton} ${
            i === selected ? classes.selected : ""
          }`}
          onClick={() => dispatch(setColorPair(i))}
          title={`Color pair ${i + 1}`}
        >
          <div className={classes.colorLeft} style={{ background: left }} />
          <div className={classes.colorRight} style={{ background: right }} />
        </button>
      ))}
    </div>
  );
};

export default Colors;
