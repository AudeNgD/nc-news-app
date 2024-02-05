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
      <img src={singleArticle.article_img_url} />
      <p>{singleArticle.title}</p>
      <p>{singleArticle.body}</p>
    </>
  );
}
