import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function UserAccountPage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <>
      <section id="account--section">
        <h2 id="account--header">Your account</h2>
        <div id="account--info">
          <img id="account--img" src={`${currentUser.avatar_url}`} />
          <div>
            <p id="account--name">Name: {currentUser.name}</p>
            <p id="account--username">Username: {currentUser.username}</p>
          </div>
        </div>
      </section>
    </>
  );
}
