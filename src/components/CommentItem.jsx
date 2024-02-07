import { deleteComment } from "../../utils/api";
import { useContext, useState } from "react";
import DeletedComment from "./DeletedComment";

export default function CommentItem(props) {
  const { comment } = props;
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  function handleDeleteClick(event) {
    event.preventDefault();
    const comment_id = event.target.value;
    deleteComment(comment_id).catch((err) => {
      setError("Cannot delete comment at this time. Please try again later");
    });
    setError(null);
    setIsDeleted(true);
  }

  return (
    <>
      {isDeleted && error === null ? (
        <DeletedComment />
      ) : (
        <>
          {comment.author === "You" ? (
            <>
              <div className="error--message"> {error}</div>
              <div id="comment--item" className="own--comment">
                <p>{comment.body}</p>
                <p>From: {comment.author}</p>
                <p>Votes: {comment.votes}</p>
                <div className="delete--button">
                  <button
                    onClick={handleDeleteClick}
                    value={comment.comment_id}
                    className="delete--comment"
                  >
                    Delete comment
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div id="comment--item">
              <p>{comment.body}</p>
              <p>From: {comment.author}</p>
              <p>Votes: {comment.votes}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
