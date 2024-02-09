import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentGuestContext from "../contexts/CurrentGuestContext";

export default function UserHomepageHeader() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { guest, setGuest } = useContext(CurrentGuestContext);

  return (
    <>
      {guest === "" ? (
        <h1>Welcome {currentUser.username}!</h1>
      ) : (
        <h1>Welcome {guest}!</h1>
      )}
    </>
  );
}
