import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyUserContext } from "../context/MyUserProvider";
import { RxAvatar } from "react-icons/rx";

export const HomeBar = () => {
  const { user,logOutUser } = useContext(MyUserContext);
  const navigate = useNavigate();
  console.log(user);

  const handleLogOut = () => {
    console.log("ajsndasd");
    
    logOutUser();
    navigate("/");
  };
  return (
    <div className="barack">
      {/* Bal felső sarok - Home ikon */}
      <div className="homebar-left">
        <span
          className="homebar-icon"
          title="Kezdőlap"
          onClick={() => navigate("/")}
        >
          🏠
        </span>
      </div>

      {/* Jobb felső sarok - Auth ikonok */}
      {user ? (
        <div className="homebar-right">
          <span
            className="homebar-text"
            title="Bejelentkezés"
            onClick={() => navigate("/signIn")}
          >
            <RxAvatar size={30} />
          </span>

          <span
            className="homebar-text"
            title="Regisztráció"
            onClick={()=>handleLogOut()}
          >
            Kijelentkezés
          </span>
        </div>
      ) : (
        <div className="homebar-right">
          <span
            className="homebar-text"
            title="Bejelentkezés"
            onClick={() => navigate("/signIn")}
          >
            Bejelentkezés
          </span>

          <span
            className="homebar-text"
            title="Regisztráció"
            onClick={() => navigate("/signUp")}
          >
            Regisztráció
          </span>
        </div>
      )}
    </div>
  );
};
