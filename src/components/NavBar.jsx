import { Link } from "react-router-dom";
import TopicLinks from "./TopicLinks";

export default function NavBar() {
  return (
    <nav>
      <Link to="/home/:user">
        <img
          src="../../assets/logo.png"
          id="main--logo"
          alt="nc news logo - a black and white computer drawing"
        ></img>
      </Link>
      {/* <ul>
        <li>
          <Link to="/home/topics">All topics</Link>
        </li>
      </ul> */}
      <TopicLinks />
    </nav>
  );
}
