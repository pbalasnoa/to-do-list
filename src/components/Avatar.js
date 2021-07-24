import DropdownMenu from "./DropdownMenu";
import { logOut } from "../services/auth";
import { useHistory } from "react-router";
import { useState } from "react";

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleLogOut = () => {
    logOut();
    history.push("/login");
  };

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        <img
          className="avatar__img"
          src="https://images.unsplash.com/photo-1510623040244-1f396031f3ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt="profile"
        />
      </div>
      {open && (
        <DropdownMenu
          open={open}
          setOpen={setOpen}
          optionOne="Cerrar sesión"
          classes="dropdown-avatar"
        />
      )}
    </div>
  );
};

export default Avatar;
