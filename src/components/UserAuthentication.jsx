import { fetchSingleUser } from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function UserAuthentication(props) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { authSuccess, setAuthSuccess, error, setError, input, setInput } =
    props;

  if (currentUser !== "guest") {
    useEffect(() => {
      fetchSingleUser({ username: input })
        .then((res) => {
          setAuthSuccess(true);
          setCurrentUser(res.user);
          localStorage.setItem("user", res.user);
        })
        .catch((err) => {
          console.log(err);
          setAuthSuccess(false);
          setError(err.response.data.msg);
        });
    }, [input]);
  }
}
