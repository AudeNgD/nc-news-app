import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  fetchArticles,
  fetchComments,
  patchArticleVotes,
} from "../../utils/api";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";
import ErrorPage from "./ErrorPage";
import CurrentGuestContext from "../contexts/CurrentGuestContext";

export default function ArticlePage() {
  const articleId = useParams();
  const [error, setError] = useState(null);
  const [toggle, isToggled] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [disabledVoting, isDisabledVoting] = useState(false);
  const [singleArticle, setSingleArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const { guest, setGuest } = useContext(CurrentGuestContext);

  useEffect(() => {
    fetchArticles(articleId)
      .then((res) => {
        setSingleArticle(res.article);
        setError(null);
        setIsLoadingArticle(false);
      })
      .catch(({ response }) => {
        setError(response.data.msg);
        setIsLoadingArticle(false);
      })
      .then(() => {
        fetchComments(articleId).then((res) => {
          setComments(res);
          setError(null);
          setIsLoadingComments(false);
        });
      })
      .catch(({ response }) => {
        setError(response.data.msg);
        setIsLoadingComments(false);
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
    if (guest === "guest") {
      setError("You must have an account to be able to like articles");
    } else {
      const vote = Number(event.target.value);
      isDisabledVoting(true);

      patchArticleVotes(vote, article_id)
        .then(() => {
          setError(null);
        })
        .catch((err) => {
          setSingleArticle((currentArticle) => {
            return { ...currentArticle, votes: currentArticle.votes - vote };
          });
          setError(
            "Voting is not available at the moment. Apologies for the inconvenience!"
          );
        });
      setSingleArticle((currentArticle) => {
        return { ...currentArticle, votes: currentArticle.votes + vote };
      });
    }
  }

  function handleCommentClick(event) {
    if (guest === "guest") {
      isToggled(false);
      setError("You must have an account to leave comments");
    } else {
      toggle ? isToggled(false) : isToggled(true);
    }
  }

  function addNewCommentToList(comment) {
    comment.votes = 0;
    setComments((currentComments) => {
      return [comment, ...currentComments];
    });
  }

  return (
    <>
      {isLoadingArticle ? (
        <p className="loading--message">...loading article</p>
      ) : (
        <>
          <img id="article--image" src={article_img_url} />
          <h2>{title}</h2>

          <p>{body}</p>
          <div className="section--interaction">
            <div className="vote">
              <button
                disabled={disabledVoting}
                className="button--vote"
                onClick={handleClickVote}
                value="1"
              >
                &#128077;
              </button>
              <button
                disabled={disabledVoting}
                className="button--vote"
                onClick={handleClickVote}
                value="-1"
              >
                &#128078;
              </button>
              <p>{votes}</p>
            </div>
            <div className="comment-feature">
              <button
                className="button--new-comment"
                onClick={handleCommentClick}
              >
                Add a comment
              </button>
            </div>
          </div>
          <div className="error--message"> {error}</div>
        </>
      )}
      {toggle ? (
        <NewCommentForm
          article_id={article_id}
          addNewCommentToList={addNewCommentToList}
          toggle={toggle}
          isToggled={isToggled}
        />
      ) : null}
      {isLoadingComments ? (
        <p className="loading--message">...loading comments</p>
      ) : (
        <CommentsList comments={comments} />
      )}
    </>
  );
}
