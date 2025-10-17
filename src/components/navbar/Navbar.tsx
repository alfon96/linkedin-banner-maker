import { downloadBanner } from "../toolbar/Download/Donwload";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.navbarCnt}>
      <h1>Create Your Personal Dev LinkedIn Banner</h1>
      <button className={classes.btn} onClick={downloadBanner}>
        Download .png
      </button>
    </div>
  );
};

export default Navbar;
