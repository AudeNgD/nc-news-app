import { deleteComment } from "../../utils/api";
import { useContext, useState } from "react";
import DeletedComment from "./DeletedComment";

export default function CommentItem(props) {
  const { comment } = props;
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDeleteClick(event) {
    event.preventDefault();
    const comment_id = event.target.value;
    deleteComment(comment_id);
    setIsDeleted(true);
  }

  return (
    <>
      {isDeleted ? (
        <DeletedComment />
      ) : (
        <>
          {comment.author === "You" ? (
            <>
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
