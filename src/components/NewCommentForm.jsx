import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { postNewComment } from "../../utils/api";

export default function NewCommentForm(props) {
  const { article_id, addNewCommentToList, toggle, isToggled } = props;
  const { currentUser, SetCurrentUser } = useContext(CurrentUserContext);
  const [userComment, setUserComment] = useState("");
  const [disabled, isDisabled] = useState(false);

  function handleCommentChange(event) {
    setUserComment(event.target.value);
  }

  function addNewComment(event) {
    event.preventDefault();
    isDisabled(true);
    //setTimeout(isDisabled(false), 5000);
    const newComment = { author: currentUser, body: userComment };
    addNewCommentToList(newComment);
    postNewComment(newComment, article_id);
    setUserComment("");
  }

  return disabled ? (
    <p>
      Thanks for leaving a comment! People like you make our community grow!
    </p>
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
