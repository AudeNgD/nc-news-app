import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles, fetchComments } from "../../utils/api";
import CommentsList from "./CommentsList";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticles(article_id)
      .then((res) => {
        setSingleArticle(res.article);
      })
      .then(() => {
        fetchComments(article_id).then((res) => {
          setComments(res);
        });
      });
  }, []);

  return (
    <>
      <img id="article--image" src={singleArticle.article_img_url} />
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.body}</p>
      <CommentsList comments={comments} />
    </>
  );
}
