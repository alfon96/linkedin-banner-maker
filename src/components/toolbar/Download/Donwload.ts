import * as htmlToImage from "html-to-image";

export const downloadBanner = async () => {
  const banner = document.getElementById("banner");
  if (!banner) return;

  await document.fonts.ready;

  // Capture at real on-screen size (no reflow)
  const dataUrl = await htmlToImage.toPng(banner, {
    backgroundColor: "transparent",
    cacheBust: true,
    style: {
      margin: "0",
      padding: "0",
      transform: "none",
      boxShadow: "none",
    },

    pixelRatio: 3, // high-res export without layout distortion
  });

  // Download result
  const link = document.createElement("a");
  link.download = "linkedin-banner.png";
  link.href = dataUrl;
  link.click();
};
