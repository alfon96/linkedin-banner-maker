import { useSelector } from "react-redux";
import TechStack from "../techStack/techStack";
import classes from "./Banner.module.css";
import type { RootState } from "../../store";
import ProfileImg from "./ProfileImg/ProfileImg";
const Banner = () => {
  const { colorTheme, selected, fullName, jobTitle, textFontSize } =
    useSelector((s: RootState) => s.input);

  return (
    <div className={classes.scaffold}>
      <div id="banner" className={classes.gridLeft}>
        {/* Left part */}
        <div
          className={classes.elemLeft}
          style={{ backgroundColor: colorTheme[selected][0] }}
        >
          <div
            className={classes.textHeader}
            style={{
              fontSize: `clamp(${1.25}rem,${textFontSize}vw, ${textFontSize}rem)`,
              color: colorTheme[selected][2],
              maxWidth: `calc(25ch / ${textFontSize / 2.5})`,
            }}
          >
            {fullName}
          </div>
          <div
            className={classes.textHeader}
            style={{
              fontSize: `clamp(${1.25}rem,${textFontSize}vw, ${textFontSize}rem)`,
              color: colorTheme[selected][2],
            }}
          >
            {jobTitle}
          </div>
        </div>
        {/* Right part */}
        <div
          className={classes.elemRight}
          style={{ backgroundColor: colorTheme[selected][1] }}
        >
          {<TechStack />}
        </div>
      </div>
      <div className={classes.gridRight}>
        Space occupied by other LinkedIn data.
      </div>

      <div className={classes.profileCnt}>
        <ProfileImg />
      </div>
    </div>
  );
};

export default Banner;
