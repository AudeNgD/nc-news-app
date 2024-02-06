import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <img src="../../assets/logo.png" id="main--logo" />
      <ul>
        <li>
          <Link to="/home/topics">All topics</Link>
        </li>
      </ul>
    </nav>
  );
}
