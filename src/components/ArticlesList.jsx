import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [sortAndOrder, setSortAndOrder] = useState({ sort_by: "", order: "" });

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

  function handleSortByChange(event) {
    event.preventDefault();
    setSortAndOrder((currentSortAndOrder) => {
      return { ...currentSortAndOrder, sort_by: event.target.value };
    });
  }

  function handleOrderByClick(event) {
    event.preventDefault();
    setSortAndOrder((currentSortAndOrder) => {
      return { ...currentSortAndOrder, order: event.target.value };
    });
  }

  return (
    <>
      {isLoadingArticles ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>Latest articles</h2>
          <div id="format--articles-list">
            <label htmlFor="sort-by" hidden></label>
            <select id="sort-by" onChange={handleSortByChange}>
              <option value="created_at">Date created</option>
              <option value="votes">Likes</option>
              <option value="comment_count">Comments</option>
            </select>
            <div id="button--sort-section">
              <button
                className="button--vote"
                value="asc"
                onClick={handleOrderByClick}
              >
                ASC
              </button>
              <button
                className="button--vote"
                value="desc"
                onClick={handleOrderByClick}
              >
                DESC
              </button>
            </div>
          </div>
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
