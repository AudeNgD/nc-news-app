import { useParams } from "react-router-dom";
import { fetchArticles } from "../../utils/api";
import { useState, useEffect } from "react";
import ArticleLink from "./ArticleLink";

export default function TopicPage() {
  const { topic } = useParams();
  const [articlesAboutTopic, setArticlesAboutTopic] = useState([]);
  const [isLoadingTopicsPage, setIsLoadingTopicsPage] = useState(true);
  const [error, setError] = useState(null);

  const query = `?topic=${topic}`;

  useEffect(() => {
    fetchArticles(query)
      .then((res) => {
        setArticlesAboutTopic(res.articles);
        setError(null);
        setIsLoadingTopicsPage(false);
      })
      .catch((err) => {
        setError(
          "Cannot retrieve articles at this time. Please try again later!"
        );
        setIsLoadingTopicsPage(false);
      });
  }, []);

  return (
    <>
      {" "}
      {isLoadingTopicsPage ? (
        <p className="loading--message">...loading articles</p>
      ) : (
        <>
          <h2>{topic}</h2>
          <div className="error--message"> {error}</div>
          {articlesAboutTopic.map((article) => {
            return (
              <div key={article.article_id} className="article--tile">
                <ArticleLink article={article} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
