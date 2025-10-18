import classes from "./Toolbar.module.css";
import Colors from "./Colors/Colors";
import TextData from "./TextData/TextData";
import TechStackInput from "./TechStack/TechStackInput";

const Toolbar = () => {
  return (
    <div className={classes.toolbarWrapper}>
      <div className={classes.toolbarHeader}>Tools</div>
      <div className={classes.toolbarCnt}>
        <div className={classes.colorsCnt}>
          <Colors />
        </div>
        <div className={classes.textDataCnt}>
          <TextData />
        </div>
        <div className={classes.techStackInputCnt}>
          <TechStackInput />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
