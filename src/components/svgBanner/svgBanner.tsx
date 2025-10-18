import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { createSvg } from "../toolbar/Download/Donwload";

import classes from "./svgBanner.module.css";
import ProfileImg from "../banner/ProfileImg/ProfileImg";
export default function SvgPreview() {
  const {
    selectedTechStack,
    selected,
    colorTheme,
    fullName,
    jobTitle,
    textFontSize,
  } = useSelector((s: RootState) => s.input);

  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    const renderSvg = async () => {
      const colors = {
        left_bg: colorTheme[selected][0],
        right_bg: colorTheme[selected][1],
        text_color: colorTheme[selected][2],
      };

      const svg = await createSvg(
        selectedTechStack,
        Math.floor(1584 * 0.75),
        0,
        62,
        1584 - Math.floor(1584 * 0.75),
        396,
        colors,
        fullName,
        jobTitle,
        textFontSize
      );

      const responsiveSvg = svg.replace(
        /<svg([^>]+)width="[^"]+"[^>]+height="[^"]+"/,
        '<svg$1viewBox="0 0 1584 396" preserveAspectRatio="xMidYMid meet"'
      );

      setSvgContent(responsiveSvg);
    };

    renderSvg();
  }, [
    selectedTechStack,
    selected,
    colorTheme,
    fullName,
    jobTitle,
    textFontSize,
  ]);

  return (
    <div className={classes.cnt}>
      <div
        className={classes.wrapper}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <div className={classes.profileCnt}>
        <ProfileImg />
      </div>
    </div>
  );
}
