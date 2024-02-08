import { useParams } from "react-router-dom";
import { fetchArticles } from "../../utils/api";
import { useState, useEffect } from "react";
import ArticleLink from "./ArticleLink";
import { SortAndOrderArticles } from "./SortAndOrderArticles";
import ErrorPage from "./ErrorPage";

export default function TopicPage() {
  const { topic } = useParams();
  const [articlesAboutTopic, setArticlesAboutTopic] = useState([]);
  const [isLoadingTopicsPage, setIsLoadingTopicsPage] = useState(true);
  const [error, setError] = useState(null);
  const [sortAndOrder, setSortAndOrder] = useState({ sort_by: "", order: "" });

  const query = { topic: `${topic}` };

  useEffect(() => {
    fetchArticles(query)
      .then((res) => {
        setArticlesAboutTopic(res.articles);
        if (sortAndOrder.sort_by !== "" || sortAndOrder.order !== "") {
          const sort_by = sortAndOrder.sort_by;
          const order = sortAndOrder.order;
          if (order === "" || order === "desc") {
            setArticlesAboutTopic((currentTopics) => {
              return [...currentTopics].sort((a, b) => {
                return b[sort_by] - a[sort_by];
              });
            });
          } else if (order === "asc") {
            setArticlesAboutTopic((currentTopics) => {
              return [...currentTopics].sort((a, b) => {
                return a[sort_by] - b[sort_by];
              });
            });
          }
        }
        setError(null);
        setIsLoadingTopicsPage(false);
      })
      .catch(({ response }) => {
        setError(response.data.msg);
        setIsLoadingTopicsPage(false);
      });
  }, [sortAndOrder]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      {isLoadingTopicsPage ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>{topic}</h2>
          <SortAndOrderArticles
            sortAndOrder={sortAndOrder}
            setSortAndOrder={setSortAndOrder}
            articlesAboutTopic={articlesAboutTopic}
            setArticlesAboutTopic={setArticlesAboutTopic}
          />
          <div id="article--deck">
            {articlesAboutTopic.map((article) => {
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
