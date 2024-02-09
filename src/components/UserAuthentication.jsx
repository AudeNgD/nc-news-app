import { fetchSingleUser } from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function UserAuthentication(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { authSuccess, setAuthSuccess, error, setError } = props;

  if (currentUser !== "guest") {
    useEffect(() => {
      fetchSingleUser({ username: currentUser })
        .then((res) => {
          setAuthSuccess(true);
        })
        .catch((err) => {
          setError(err.response.data.msg);
        });
    }, [currentUser]);
  }
}
