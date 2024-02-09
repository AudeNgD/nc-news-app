import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentGuestContext from "../contexts/CurrentGuestContext";
import { Link } from "react-router-dom";
import UserAuthentication from "./UserAuthentication";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { guest, setGuest } = useContext(CurrentGuestContext);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    if (input === "") {
      setError("Please provide a valid username");
    }
    if (authSuccess === true) {
      setGuest("");
      navigate(`/home/${currentUser.username}`);
    }
  }

  function handleUsernameChange(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function handleGuestLogin(event) {
    event.preventDefault();
    setGuest("guest");
    navigate(`/home/${guest}`);
  }

  return (
    <>
      <UserAuthentication
        authSuccess={authSuccess}
        setAuthSuccess={setAuthSuccess}
        error={error}
        setError={setError}
        input={input}
        setInput={setInput}
      />
      <form onSubmit={handleLogin} id="form--login">
        <label htmlFor="input-username">Enter your username</label>
        <input
          id="input-username"
          type="text"
          value={input}
          onChange={handleUsernameChange}
          placeholder="Enter a username"
        ></input>

        <button>Submit</button>
      </form>
      <Link to={`/home/${guest}`}>
        <p value={guest} onClick={handleGuestLogin}>
          Or login as a guest
        </p>
      </Link>
      <p>{error}</p>
    </>
  );
}
