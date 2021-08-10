import { useContext, useEffect, useState, useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import { logOut } from "../services/auth";
import { useHistory } from "react-router";

import AuthContext from "../context/AuthContext";

import useGetImgUrl from "../hooks/useGetImgUrl";
import { getProfileAvatar } from "../services/auth";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  const refFileDialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [imgNew, setImgNew] = useState();
  const [uploadImg, setUploadImg] = useState([]);
  const [urlImg, progress] = useGetImgUrl(uploadImg);
  const history = useHistory();

  const handleLogOut = () => {
    history.push("/opening");
    logOut();
  };

  const handleChangeImg = (event) => {
    if (event.target.files.length > 0) {
      setImgNew(URL.createObjectURL(event.target.files[0]));
      setUploadImg(event.target.files[0]);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (progress === 100 && urlImg.length > 0) {
      getProfileAvatar(user.id, urlImg);
    }
  }, [progress, urlImg]);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        {imgNew ? (
          <img className="avatar__img" src={imgNew} alt="profile" />
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
              nameItem: "Cerrar sesión",
              "Cerrar sesión": handleLogOut,
            },
            {
              nameItem: "Cambiar foto",
              "Cambiar foto": () => refFileDialog.current.click(),
            },
          ]}
        />
      )}
    </div>
  );
};

export default Avatar;
