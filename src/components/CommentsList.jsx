import { useContext, useState } from "react";
import CommentItem from "./CommentItem";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentGuestContext from "../contexts/CurrentGuestContext";

export default function CommentsList(props) {
  const { comments } = props;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { guest, setGuest } = useContext(CurrentGuestContext);

  return (
    <div id="comment--section">
      <h3>Comments</h3>
      {comments.map((comment) => {
        console.log(currentUser);
        if (guest === "") {
          if (comment.author === currentUser.username) {
            comment.author = "You";
          }
        }
        return (
          <CommentItem
            key={comment.comment_id + comment.author}
            comment={comment}
          />
        );
      })}
    </div>
  );
}
