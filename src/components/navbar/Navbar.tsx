import { useDispatch, useSelector } from "react-redux";
import { generateBannerPng } from "../toolbar/Download/Donwload";
import { setLoading } from "../../inputSlice";
import type { RootState } from "../../store";
import classes from "./Navbar.module.css";

const Navbar = () => {
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
    <div className={classes.navbarCnt}>
      <h1 className={classes.heaeder}>
        Create Your Personal Dev LinkedIn Banner
      </h1>
      <button
        className={classes.btn}
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? <span className={classes.loader}></span> : "Download .png"}
      </button>
    </div>
  );
};

export default Navbar;
