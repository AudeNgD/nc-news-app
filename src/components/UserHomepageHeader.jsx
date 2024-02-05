import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function UserHomepageHeader() {
  const { currentUser, SetCurrentUser } = useContext(CurrentUserContext);
  return <h1>Welcome {currentUser}!</h1>;
}
