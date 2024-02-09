import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function UserHomepageHeader() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return <h1>Welcome {currentUser.username}!</h1>;
}
