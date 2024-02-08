import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";
import { SortAndOrderArticles } from "./SortAndOrderArticles";

export default function ArticlesList(props) {
  const [sortAndOrder, setSortAndOrder] = useState({ sort_by: "", order: "" });
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    fetchArticles(sortAndOrder)
      .then((res) => {
        setArticles(res.articles);
        setIsLoadingArticles(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingArticles(false);
      });
  }, [sortAndOrder]);

  return (
    <>
      {isLoadingArticles ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>Latest articles</h2>
          <SortAndOrderArticles
            sortAndOrder={sortAndOrder}
            setSortAndOrder={setSortAndOrder}
          />

          <div id="article--deck">
            {articles.map((article) => {
              return (
                <div key={article.article_id} className="article--tile">
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
