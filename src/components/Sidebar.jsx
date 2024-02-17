import { Link, NavLink } from "react-router-dom";
import CurrentGuestContext from "../contexts/CurrentGuestContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Expire from "./Expire";
import TopicLinks from "./TopicLinks";

export default function Sidebar() {
  const { guest, setGuest } = useContext(CurrentGuestContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleClickNewArticle(event) {
    if (guest !== "guest") {
      navigate("/home/articles/new-article");
    } else {
      console.log(event);
      setError("You must be logged in to add a new article");
      //setTimeout(setError(""), 5000);
      //cannot pass setError here directly as would be passing the result of setError to setTimeout
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <>
      <section id="sidebar">
        <button id="sidebar--button" onClick={handleClickNewArticle}>
          Post a new article
        </button>
        {/* <Expire delay="5000">
          <p className="error--message">{error}</p>
        </Expire> */}
        {error !== "" ? <p className="error--message">{error}</p> : null}
        <TopicLinks />
      </section>
    </>
  );
}
