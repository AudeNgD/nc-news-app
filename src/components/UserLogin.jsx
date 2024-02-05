import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

export default function UserLogin() {
  const { currentUser, SetCurrentUser } = useContext(CurrentUserContext);

  function handleLogin(event) {
    event.preventDefault();
  }

  function handleUsernameChange(event) {
    event.preventDefault();
    SetCurrentUser(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="input-username">Username:</label>
        <input
          id="input-username"
          type="text"
          value={currentUser}
          onChange={handleUsernameChange}
        ></input>
        <Link to={`/home/${currentUser}`}>
          <button>Submit</button>
        </Link>
      </form>
    </>
  );
}
