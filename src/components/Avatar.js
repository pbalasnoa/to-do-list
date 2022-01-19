import { useContext, useEffect, useState, useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import MinLoader from "./MinLoader";

import { updateProfileAvatar, logOut } from "../api/services/auth";
import AuthContext from "../context/AuthContext";

import useGetImgUrl from "../hooks/useGetImgUrl";

const Avatar = () => {
  const { user = null, setUser } = useContext(AuthContext);
  const refFileDialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [imgNew, setImgNew] = useState();
  const [uploadImg, setUploadImg] = useState([]);
  const [urlImg, progress] = useGetImgUrl(uploadImg);

  const handleChangeImg = (event) => {
    if (event.target.files.length > 0) {
      setImgNew(URL.createObjectURL(event.target.files[0]));
      setUploadImg(event.target.files[0]);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (progress === 100 && urlImg.length > 0) {
      updateProfileAvatar(user.id, urlImg, ({ success }) => {
        if (success === "ok")
          setUser((prevUser) => ({ ...prevUser, avatar: urlImg }));
      });
    }
  }, [progress, urlImg, user?.id, setUser]);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        {imgNew && progress < 100 ? (
          <MinLoader />
        ) : user && user.avatar ? (
          <img className="avatar__img" src={user.avatar} alt="profile" />
        ) : (
          <img
            className="avatar__img"
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=wavatar"
            alt="profile"
          />
        )}
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          name="imgAd"
          id="imgAd"
          onChange={handleChangeImg}
          ref={refFileDialog}
        />
      </div>
      {open && (
        <DropdownMenu
          open={open}
          setOpen={setOpen}
          classes="dropdown-avatar"
          items={[
            {
              nameItem: "Cambiar foto",
              "Cambiar foto": () => refFileDialog.current.click(),
              icon: "camera_enhance",
            },
            {
              nameItem: "Cerrar sesión",
              "Cerrar sesión": logOut,
              icon: "logout",
            },
          ]}
        />
      )}
    </div>
  );
};

export default Avatar;
