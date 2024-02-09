import { fetchArticles } from "../../utils/api";
import { useEffect, useState } from "react";
import ArticleLink from "./ArticleLink";
import { SortAndOrderArticles } from "./SortAndOrderArticles";
import { useSearchParams } from "react-router-dom";

export default function ArticlesList(props) {
  const [queries, setQueries] = useState({
    sort_by: "created_at",
    order: "desc",
    p: 1,
    limit: 10,
  });
  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchArticles(queries)
      .then((res) => {
        setTotalNumberOfArticles(res.total_count);
        setTotalNumberOfPages(Math.ceil(res.total_count / 10));
        setArticles(res.articles);
        setIsLoadingArticles(false);
        setSearchParams(queries);
      })
      .catch((err) => {
        setIsLoadingArticles(false);
      });
  }, [queries]);

  function handlePageClick(event) {
    console.log(event);
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage((currentPage) => currentPage + Number(event.target.value));
    setQueries((currentQueries) => {
      return { ...currentQueries, p: currentPage };
    });
  }

  return (
    <>
      {isLoadingArticles ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>Articles</h2>
          <SortAndOrderArticles queries={queries} setQueries={setQueries} />

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
            {currentPage > 1 ? (
              <>
                <label htmlFor="button--previous"></label>
                <button
                  className="button--change-page"
                  id="button--previous"
                  onClick={handlePageClick}
                  value="-1"
                >
                  &lt;
                </button>
              </>
            ) : null}
            <p>
              {currentPage}/{totalNumberOfPages}
            </p>
            <label htmlFor="button--next"></label>
            <button
              className="button--change-page"
              id="button--next"
              onClick={handlePageClick}
              value="1"
              disabled={currentPage === totalNumberOfPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </>
  );
}
