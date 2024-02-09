import { Link, NavLink } from "react-router-dom";
import CurrentGuestContext from "../contexts/CurrentGuestContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Expire from "./Expire";

export default function Sidebar() {
  const { guest } = useContext(CurrentGuestContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleClickNewArticle(event) {
    if (guest !== "guest") {
      navigate("/home/articles/new-article");
    } else {
      setError("You must be logged in to add a new article");
    }
  }

  return (
    <>
      <section id="sidebar">
        <button onClick={handleClickNewArticle}>Post a new article</button>
        <Expire delay="5000">
          <p className="error--message">{error}</p>
        </Expire>
      </section>
    </>
  );
}
