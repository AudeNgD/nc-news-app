import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/api";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [singleArticle, SetSingleArticle] = useState([]);

  useEffect(() => {
    fetchArticles(article_id).then((res) => {
      SetSingleArticle(res.article);
    });
  }, []);

  return (
    <>
      <img id="article--image" src={singleArticle.article_img_url} />
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.body}</p>
    </>
  );
}
