import { useDispatch, useSelector } from "react-redux";
import { generateBannerPng } from "./Donwload";
import { setLoading } from "../../../inputSlice";
import type { RootState } from "../../../store";
import classes from "./DownloadButton.module.css";

const DownloadButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s: RootState) => s.input);

  const handleDownload = async () => {
    dispatch(setLoading(true));
    try {
      await generateBannerPng();
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
