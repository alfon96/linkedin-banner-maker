import { useState } from "react";
import classes from "./ProfileImg.module.css";

const ProfileImg = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="profile-upload"
        className={classes.imgCnt}
        onChange={handleUpload}
      />

      <label htmlFor="profile-upload" className={classes.uploadBtn}>
        {image ? (
          <div
            className={classes.profileImg}
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <span className={classes.defaultText}>Upload Image</span>
        )}
      </label>
    </>
  );
};

export default ProfileImg;
