import { useDispatch, useSelector } from "react-redux";
import { downloadBanner } from "../toolbar/Download/Donwload";
import { setLoading } from "../../inputSlice";
import type { RootState } from "../../store";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s: RootState) => s.input.loading);

  const handleDownload = async () => {
    dispatch(setLoading(true));
    try {
      await downloadBanner();
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classes.navbarCnt}>
      <h1>Create Your Personal Dev LinkedIn Banner</h1>
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
