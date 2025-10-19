import { useDispatch, useSelector } from "react-redux";
import { generateBannerPng } from "./Donwload";
import { setLoading } from "../../../inputSlice";
import type { RootState } from "../../../store";
import classes from "./DownloadButton.module.css";

const DownloadButton = () => {
  const dispatch = useDispatch();
  const {
    loading,
    selectedTechStack,
    selected,
    colorTheme,
    fullName,
    jobTitle,
    textFontSize,
  } = useSelector((s: RootState) => s.input);

  const handleDownload = async () => {
    dispatch(setLoading(true));
    try {
      await generateBannerPng({
        techStack: selectedTechStack,
        colors: {
          left_bg: colorTheme[selected][0],
          right_bg: colorTheme[selected][1],
          text_color: colorTheme[selected][2],
        },
        fullName: fullName,
        jobTitle: jobTitle,
        fontSize: textFontSize,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <button className={classes.btn} onClick={handleDownload} disabled={loading}>
      {loading ? <span className={classes.loader}></span> : "Save as PNG"}
    </button>
  );
};

export default DownloadButton;
