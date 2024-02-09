import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { postNewComment } from "../../utils/api";
import DelayedSuccessMessage from "./DelayedSuccessMessage";

export default function NewCommentForm(props) {
  const { article_id, addNewCommentToList, toggle, isToggled } = props;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userComment, setUserComment] = useState("");
  const [disabled, isDisabled] = useState(false);
  const [error, setError] = useState(null);

  function handleCommentChange(event) {
    setUserComment(event.target.value);
  }

  function addNewComment(event) {
    event.preventDefault();
    isDisabled(true);
    const newComment = { author: currentUser.username, body: userComment };
    postNewComment(newComment, article_id).catch((err) => {
      setError("Cannot post comment at this time. Please try again later");
    });
    if (error === null) {
      addNewCommentToList(newComment);
    }
    setUserComment("");
  }

  return disabled && error !== null ? (
    <p className="error--message">{error}</p>
  ) : disabled && error === null ? (
    <DelayedSuccessMessage />
  ) : (
    <form className="comment--form" onSubmit={addNewComment}>
      <label>Your comment...</label>
      <textarea
        rows="4"
        cols="90"
        value={userComment}
        onChange={handleCommentChange}
        required
      ></textarea>
      <button disabled={disabled}>Submit</button>
    </form>
  );
}
