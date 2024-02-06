import { useContext, useState } from "react";
import CommentItem from "./CommentItem";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function CommentsList(props) {
  const { comments } = props;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <div id="comment--section">
      <h3>Comments</h3>
      {comments.map((comment) => {
        if (comment.author === currentUser) {
          comment.author = "You";
        }
        return <CommentItem key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
}
