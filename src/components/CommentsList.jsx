import CommentItem from "./CommentItem";

export default function CommentsList(props) {
  const { comments } = props;

  return (
    <div id="comment--section">
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <CommentItem comment={comment} key={comment.comment_id} />;
      })}
    </div>
  );
}
