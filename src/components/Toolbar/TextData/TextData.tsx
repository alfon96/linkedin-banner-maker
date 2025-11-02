import classes from "./TextData.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  setNameFontSize,
  setFullName,
  setJobTitle,
  setJobtitleFontSize,
  setLetterSpacingName,
  setLetterSpacingJobtitle,
  setTechIconsSize,
  setNameIsBold,
  setJobTitleIsBold,
} from "../../../inputSlice";
import { setFontFamily } from "../../../fontSlice";

const TextData = () => {
  const dispatch = useDispatch();
  const {
    fullName,
    jobTitle,
    nameFontSize,
    jobTitleFontSize,
    letterSpacingName,
    letterSpacingJobTitle,
    techIconsSize,
  } = useSelector((s: RootState) => s.input);

  const { fontFamily } = useSelector((s: RootState) => s.fonts);

  const transformText = (upperLower: boolean, text: string) => {
    if (upperLower) {
      text = text.toUpperCase();
    } else {
      text = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return text;
  };

  return (
    <div className={classes.textDataCnt}>
      <label htmlFor="full-name">Your Name</label>
      <input
        className={classes.inputEl}
        id="full-name"
        aria-label="name"
        value={fullName}
        onChange={(e) => dispatch(setFullName(e.target.value))}
      ></input>
      <label htmlFor="job-title">Your Role</label>
      <input
        className={classes.inputEl}
        id={"job-title"}
        aria-label="job-title"
        value={jobTitle}
        onChange={(e) => dispatch(setJobTitle(e.target.value))}
      ></input>
      <label htmlFor="font-size-name">Name Font Size</label>
      <input
        className={classes.inputEl}
        id="font-size-name"
        type="number"
        min={40}
        max={70}
        step={1}
        onChange={(e) => dispatch(setNameFontSize(parseFloat(e.target.value)))}
        value={nameFontSize}
      ></input>
      <label htmlFor="font-size-job-title">Job title Font Size</label>
      <input
        className={classes.inputEl}
        id="font-size-job-title"
        type="number"
        min={30}
        max={55}
        step={1}
        onChange={(e) =>
          dispatch(setJobtitleFontSize(parseFloat(e.target.value)))
        }
        value={jobTitleFontSize}
      ></input>
      <label htmlFor="name-letter-spacing">Letter spacing Name</label>
      <input
        className={classes.inputEl}
        id="name-letter-spacing"
        type="number"
        min={1}
        max={18}
        step={0.5}
        onChange={(e) =>
          dispatch(setLetterSpacingName(parseFloat(e.target.value)))
        }
        value={letterSpacingName}
      ></input>
      <label htmlFor="job-letter-spacing">Letter spacing Job Title</label>
      <input
        className={classes.inputEl}
        id="job-letter-spacing"
        type="number"
        min={1}
        max={10}
        step={0.5}
        onChange={(e) =>
          dispatch(setLetterSpacingJobtitle(parseFloat(e.target.value)))
        }
        value={letterSpacingJobTitle}
      ></input>

      <label htmlFor="icon-size">Icon Size</label>
      <input
        className={classes.inputEl}
        id="icon-size"
        type="number"
        min={50}
        max={70}
        step={0.5}
        onChange={(e) => dispatch(setTechIconsSize(parseFloat(e.target.value)))}
        value={techIconsSize}
      ></input>

      <div className={classes.checkboxCnt}>
        <label htmlFor="uppercase-name">Uppercase Name</label>
        <input
          type="checkbox"
          id="uppercase-name"
          onClick={(e) =>
            dispatch(
              setFullName(transformText(e.currentTarget.checked, fullName))
            )
          }
        />

        <label htmlFor="bold-name">Bold</label>
        <input
          type="checkbox"
          id="bold-name"
          onClick={(e) => dispatch(setNameIsBold(e.currentTarget.checked))}
        />
      </div>
      <div className={classes.checkboxCnt}>
        <label htmlFor="uppercase-job-title">Uppercase Job Title</label>
        <input
          type="checkbox"
          id="uppercase-job-title"
          onClick={(e) =>
            dispatch(
              setJobTitle(transformText(e.currentTarget.checked, jobTitle))
            )
          }
        />

        <label htmlFor="bold-job-title">Bold</label>
        <input
          type="checkbox"
          id="bold-job-title"
          onClick={(e) => dispatch(setJobTitleIsBold(e.currentTarget.checked))}
        />
      </div>

      <label htmlFor="fontFamily">Font family</label>
      <select
        id="fontFamily"
        value={fontFamily}
        onChange={(e) => {
          dispatch(setFontFamily(e.target.value));
        }}
      >
        <option value="" disabled>
          Choose a font family
        </option>
        <option value="ComingSoon">ComingSoon</option>
        <option value="DMSans">DMSans</option>
        <option value="IBMPlexSans">IBMPlexSans</option>
        <option value="Inter">Inter</option>
        <option value="Lato">Lato</option>
        <option value="MomoTrust">MomoTrust</option>
        <option value="MomoTrustDisplay">MomoTrustDisplay</option>
        <option value="Montserrat">Montserrat</option>
        <option value="PlusJakartaSans">PlusJakartaSans</option>
        <option value="Poppins">Poppins</option>
        <option value="Sora">Sora</option>
        <option value="SpaceGrotesk">SpaceGrotesk</option>
      </select>
    </div>
  );
};

export default TextData;
