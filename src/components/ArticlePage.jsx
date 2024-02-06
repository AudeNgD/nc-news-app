import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchArticles,
  fetchComments,
  patchArticleVotes,
} from "../../utils/api";
import CommentsList from "./CommentsList";

export default function ArticlePage() {
  const { articleId } = useParams();
  const [error, setError] = useState(null);

  const [singleArticle, setSingleArticle] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticles(articleId)
      .then((res) => {
        setSingleArticle(res.article);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .then(() => {
        fetchComments(articleId).then((res) => {
          setComments(res);
          setError(null);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const {
    article_id,
    title,
    topic,
    created_at,
    author,
    votes,
    body,
    article_img_url,
  } = singleArticle;

  function handleClickVote(event) {
    const vote = Number(event.target.value);
    patchArticleVotes(vote, article_id)
      .then((res) => {
        setSingleArticle((currentArticle) => {
          return { ...currentArticle, votes: votes + vote };
        });
      })
      .catch((err) => {
        setSingleArticle((currentArticle) => {
          return { ...currentArticle, votes: votes - vote };
        });
      });
  }

  return (
    <>
      <img id="article--image" src={article_img_url} />
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="vote">
        <button className="button--vote" onClick={handleClickVote} value="1">
          &#128077;{" "}
        </button>
        <button className="button--vote" onClick={handleClickVote} value="-1">
          &#128078;
        </button>
        <p>{votes}</p>
      </div>
      <CommentsList comments={comments} />
    </>
  );
}
