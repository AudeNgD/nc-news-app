import { Link } from "react-router-dom";
import moment from "moment";

export default function ArticleLink(props) {
  const { article } = props;

  let formattedDate = moment(article.created_at).format("Do MMMM YYYY");
  return (
    <>
      <Link to={`/home/articles/${article.article_id}`}>
        <p>{article.title}</p>
      </Link>
      <p>By: {article.author}</p>
      <p>
        Topic: <Link to={`/home/topics/${article.topic}`}>{article.topic}</Link>
      </p>
      <p>On: {formattedDate}</p>
      {/* <p>On: {Date(article.created_at)}</p> */}
      <p>Likes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </>
  );
}
