import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";
import { SortAndOrderArticles } from "./SortAndOrderArticles";

export default function ArticlesList(props) {
  const [queries, setQueries] = useState({
    sort_by: "",
    order: "",
    p: 1,
    limit: 10,
  });
  const [sortAndOrder, setSortAndOrder] = useState({ sort_by: "", order: "" });
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles(sortAndOrder)
      .then((res) => {
        setTotalNumberOfArticles(res.total_count);
        setTotalNumberOfPages(Math.ceil(res.total_count / 10));
        setArticles(res.articles);
        setIsLoadingArticles(false);
      })
      .catch((err) => {
        setIsLoadingArticles(false);
      });
  }, [sortAndOrder]);

  function handleNextClick(event) {
    currentPage((currentPage) => currentPage + 1);
  }

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
          <div className="pagination">
            <p>
              {currentPage}/{totalNumberOfPages}
            </p>
            <label htmlFor="button--next"></label>
            <button
              id="button--next"
              onClick={handleNextClick}
              disabled={currentPage === totalNumberOfPages}
            >
              Next page
            </button>
          </div>
        </>
      )}
    </>
  );
}
