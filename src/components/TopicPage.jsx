import { useParams } from "react-router-dom";
import { fetchArticles } from "../../utils/api";
import { useState, useEffect } from "react";
import ArticleLink from "./ArticleLink";

export default function TopicPage() {
  const { topic } = useParams();
  const [articlesAboutTopic, setArticlesAboutTopic] = useState([]);

  const query = `?topic=${topic}`;

  useEffect(() => {
    fetchArticles(query)
      .then((res) => {
        setArticlesAboutTopic(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h2>{topic}</h2>
      {articlesAboutTopic.map((article) => {
        return (
          <div key={article.article_id} className="article--tile">
            <ArticleLink article={article} />
          </div>
        );
      })}
    </>
  );
}
