import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        setArticles(res.articles);
        setIsLoadingArticles(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingArticles(false);
      });
  }, [setArticles]);

  return (
    <>
      {isLoadingArticles ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>Latest articles</h2>

          <div id="article--deck">
            {articles.map((article) => {
              return (
                <div key={article.article_id} class="article--tile">
                  <ArticleLink article={article} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
