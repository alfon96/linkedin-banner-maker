import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { SimpleBanner } from "../Templates/SimpleBanner";
import ProfileImg from "../ProfileImg/ProfileImg";
import classes from "./svgBanner.module.css";
import {
  createIconsMatrix,
  HEIGHT,
  LEFT_WIDTH,
  loadFontBase64,
  RIGHT_WIDTH,
} from "../Toolbar/Download/Donwload";
import { setBase64, setIsLoaded } from "../../fontSlice";

export default function SvgPreview() {
  const {
    selectedTechStack,
    selected,
    colorTheme,
    fullName,
    jobTitle,
    nameFontSize,
    jobTitleFontSize,
    letterSpacingName,
    letterSpacingJobTitle,
    techIconsSize,
    nameIsBold,
    jobTitleIsBold,
  } = useSelector((s: RootState) => s.input);

  const dispatch = useDispatch();
  const [iconsSvg, setIconsSvg] = useState<string>("");
  const colors = {
    left: colorTheme[selected][0],
    right: colorTheme[selected][1],
    text: colorTheme[selected][2],
  };

  const { fontFamily, base64, isLoaded } = useSelector(
    (s: RootState) => s.fonts
  );

  useEffect(() => {
    (async () => {
      console.log("Loading font:", fontFamily);
      const base64 = await loadFontBase64(fontFamily);
      console.log("Loaded font data:", base64 ? "regular" : "none");

      if (base64) {
        dispatch(setBase64(base64));
      } else {
        dispatch(setBase64(null));
      }
    })();

    return () => {};
  }, [fontFamily]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!selectedTechStack || selectedTechStack.length === 0) {
        setIconsSvg("");
        return;
      }

      const svgString = await createIconsMatrix(
        selectedTechStack,
        LEFT_WIDTH,
        0,
        techIconsSize,
        RIGHT_WIDTH,
        HEIGHT
      );

      if (!cancelled && svgString) {
        setIconsSvg(svgString);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedTechStack, techIconsSize, colorTheme, selected]);

  return (
    <div className={classes.cnt}>
      <div id="wrapper-banner" className={classes.wrapper}>
        <SimpleBanner
          width={1584}
          height={396}
          colors={colors}
          fontFamily={fontFamily}
          fontBase64={base64}
          fullName={fullName}
          fullNameIsBold={nameIsBold}
          jobTitleIsBold={jobTitleIsBold}
          jobTitle={jobTitle}
          fontSizeMain={nameFontSize}
          fontSizeSub={jobTitleFontSize}
          letterSpacingMain={letterSpacingName}
          letterSpacingSub={letterSpacingJobTitle}
          extra={
            iconsSvg ? (
              <g
                filter="url(#iconShadow)"
                dangerouslySetInnerHTML={{ __html: iconsSvg }}
              />
            ) : null
          }
        />
      </div>

      <div className={classes.profileCnt}>
        <ProfileImg />
      </div>
    </div>
  );
}
