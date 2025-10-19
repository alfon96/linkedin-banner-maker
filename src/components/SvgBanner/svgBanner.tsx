import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { createSvg } from "../Toolbar/Download/Donwload";

import classes from "./svgBanner.module.css";
import ProfileImg from "../ProfileImg/ProfileImg";

export default function SvgPreview() {
  const {
    selectedTechStack,
    selected,
    colorTheme,
    fullName,
    jobTitle,
    textFontSize,
  } = useSelector((s: RootState) => s.input);

  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const renderSvg = async () => {
      const colors = {
        left_bg: colorTheme[selected][0],
        right_bg: colorTheme[selected][1],
        text_color: colorTheme[selected][2],
      };

      try {
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
          textFontSize,
          signal
        );

        const responsiveSvg = svg.replace(
          /<svg([^>]+)width="[^"]+"[^>]+height="[^"]+"/,
          '<svg$1viewBox="0 0 1584 396" preserveAspectRatio="xMidYMid meet"'
        );

        if (!signal.aborted) setSvgContent(responsiveSvg);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("SVG generation failed:", err);
      }
    };

    renderSvg();

    return () => controller.abort();
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
