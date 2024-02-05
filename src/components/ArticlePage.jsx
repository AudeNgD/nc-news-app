import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchArticles,
  fetchComments,
  patchArticleVotes,
} from "../../utils/api";
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

  function handleClickVote(event) {
    const vote = Number(event.target.value);
    patchArticleVotes(vote, singleArticle.article_id).then((res) => {
      setSingleArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes + vote };
      });
    });
  }

  return (
    <>
      <img id="article--image" src={singleArticle.article_img_url} />
      <h2>{singleArticle.title}</h2>
      <p>{singleArticle.body}</p>
      <div className="vote">
        <button className="button--vote" onClick={handleClickVote} value="1">
          &#128077;{" "}
        </button>
        <button className="button--vote" onClick={handleClickVote} value="-1">
          &#128078;
        </button>
        <p>{singleArticle.votes}</p>
      </div>
      <CommentsList comments={comments} />
    </>
  );
}
