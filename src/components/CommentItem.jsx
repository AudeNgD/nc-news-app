export default function CommentItem(props) {
  const { comment } = props;

  return (
    <div id="comment--item">
      <p>{comment.body}</p>
      <p>From: {comment.author}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
}
