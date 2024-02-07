import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/home/:user">
        <img src="../../assets/logo.png" id="main--logo"></img>
      </Link>
      <ul>
        <li>
          <Link to="/home/topics">All topics</Link>
        </li>
      </ul>
    </nav>
  );
}
