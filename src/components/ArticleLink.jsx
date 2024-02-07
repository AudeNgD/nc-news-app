import { Link } from "react-router-dom";

export default function ArticleLink(props) {
  const { article } = props;
  return (
    <>
      <Link to={`/home/articles/${article.article_id}`}>
        <p>{article.title}</p>
      </Link>
      <p>By: {article.author}</p>
      <p>
        Topic: <Link to={`/home/topics/${article.topic}`}>{article.topic}</Link>
      </p>

      <p>On: {Date(article.created_at)}</p>
      <p>Likes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
    </>
  );
}
