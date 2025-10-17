import * as domtoimage from "dom-to-image-more";

export const downloadBanner = async () => {
  const banner = document.getElementById("banner");
  if (!banner) return;

  await document.fonts.ready;

  const dataUrl = await domtoimage.toPng(banner, {
    bgcolor: "transparent",
    style: { margin: 0, padding: 0 },
    quality: 1,
    scale: 3,
  });

  const link = document.createElement("a");
  link.download = "linkedin-banner.png";
  link.href = dataUrl;
  link.click();
};
