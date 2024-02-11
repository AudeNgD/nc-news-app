import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentGuestContext from "../contexts/CurrentGuestContext";
import { useNavigate } from "react-router-dom";

export default function Logger() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { guest, setGuest } = useContext(CurrentGuestContext);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    navigate("/login");
  }

  function handleLogout(event) {
    setCurrentUser("");
    setGuest("guest");
    navigate("/login");
  }

  return (
    <>
      {guest === "" ? (
        <button id="button--logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button id="button--login" onClick={handleLogin}>
          Login
        </button>
      )}
    </>
  );
}
