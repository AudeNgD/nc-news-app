import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import TopicLinks from "./TopicLinks";
import CurrentGuestContext from "../contexts/CurrentGuestContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserAccountPage from "./UserAccountPage";
import Logger from "./Logger";

export default function NavBar() {
  const { guest, setGuest } = useContext(CurrentGuestContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let location = useLocation();

  return (
    <nav>
      <Link to={`/home`}>
        <img
          src="../src/assets/logo.png"
          id="main--logo"
          alt="nc news logo - a black and white computer drawing"
        ></img>
      </Link>
      {/* <TopicLinks /> */}
      {guest === "" &&
      location.pathname !== `/home/${currentUser.username}/account` ? (
        <Link to={`/home/${currentUser.username}/account`} id="link--account">
          My account
        </Link>
      ) : null}
      <Logger />
    </nav>
  );
}
