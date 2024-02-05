import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";

export default function ArticlesList() {
  const [articles, SetArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        SetArticles(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SetArticles]);

  return (
    <>
      <h2>Latest articles</h2>
      {articles.map((article) => {
        console.log(article);
        return (
          <div key={article.article_id}>
            <ArticleLink article={article} />
            {/* <p>Preview: {article.body.slice(0, 15)}</p> */}
            <p>By: {article.author}</p>
            <p>On: {Date(article.created_at)}</p>
          </div>
        );
      })}
    </>
  );
}
