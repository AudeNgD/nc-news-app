import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        setArticles(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setArticles]);

  return (
    <>
      <h2>Latest articles</h2>
      <div id="article--deck">
        {articles.map((article) => {
          return (
            <div key={article.article_id} id="article--tile">
              <ArticleLink article={article} />
              <p>By: {article.author}</p>
              <p>On: {Date(article.created_at)}</p>
              <p>Likes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
