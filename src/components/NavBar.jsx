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
      <div id="nav--left-item">
        <Link to={`/home`}>
          <img
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            id="main--logo"
            alt="nc news logo - a black and white computer drawing"
          ></img>
        </Link>
        {location.pathname !== "/home" ? (
          <>
            <ul id="nav--menu-links">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                {" "}
                <Link to="/home/topics">Topics</Link>
              </li>
            </ul>
          </>
        ) : null}
      </div>
      <div id="nav--right-item">
        {guest === "" &&
        location.pathname !== `/home/${currentUser.username}/account` ? (
          <Link to={`/home/${currentUser.username}/account`} id="link--account">
            My account
          </Link>
        ) : null}
        <Logger />
      </div>
    </nav>
  );
}
