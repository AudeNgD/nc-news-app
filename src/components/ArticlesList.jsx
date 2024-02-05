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
      {articles.map((article) => {
        return (
          <div key={article.article_id}>
            <ArticleLink article={article} />
            <p>By: {article.author}</p>
            <p>On: {Date(article.created_at)}</p>
          </div>
        );
      })}
    </>
  );
}
