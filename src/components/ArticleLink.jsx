import { Link } from "react-router-dom";

export default function ArticleLink(props) {
  const { article } = props;
  return (
    <Link to={`/home/articles/${article.article_id}`}>
      <p>{article.title}</p>
    </Link>
  );
}
