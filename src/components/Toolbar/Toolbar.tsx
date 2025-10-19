import classes from "./Toolbar.module.css";
import Colors from "./Colors/Colors";
import TextData from "./TextData/TextData";
import TechStackInput from "./TechStack/TechStackInput";
import DownloadButton from "./Download/DownloadButton";

const Toolbar = () => {
  return (
    <div className={classes.toolbarCnt}>
      <TextData />
      <Colors />
      <TechStackInput />
      <DownloadButton />
    </div>
  );
};

export default Toolbar;
