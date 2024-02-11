import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ExistingTopicsContext from "../contexts/ExistingTopicsContext";
import NewTopic from "./NewTopic";
import { postNewArticle } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { topics, setTopics } = useContext(ExistingTopicsContext);
  const [topicDescription, setTopicDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [existingTopic, isExistingTopic] = useState(true);
  const [toggle, isToggled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [req, setReq] = useState({
    author: currentUser.username,
    title: "",
    body: "",
    topic: "",
  });

  function addNewArticle(event) {
    event.preventDefault();
    postNewArticle(req)
      .then((res) => {
        navigate(`/home/articles/${res.article_id}`);
      })
      .catch((err) => {
        setError("Cannot post article at this time. Please try again later");
      });
  }

  function handleTopicChange(event) {
    event.preventDefault();
    setReq((currentReq) => {
      return { ...currentReq, topic: event.target.value };
    });
  }

  function handleTopicBlur(event) {
    checkIsExistingTopic(req.topic);
  }

  function checkIsExistingTopic(inputTopic) {
    const found = topics.find((topic) => topic.slug === inputTopic);
    if (typeof found !== "undefined") {
      console.log(found);
      console.log("here");
      isExistingTopic(true);
    } else {
      console.log("there");
      isToggled(true);
    }
  }

  function handleTitleChange(event) {
    event.preventDefault();
    setReq((currentReq) => {
      return { ...currentReq, title: event.target.value };
    });
  }

  function handleBodyChange(event) {
    event.preventDefault();
    setReq((currentReq) => {
      return { ...currentReq, body: event.target.value };
    });
  }

  function handleImgURLChange(event) {
    event.preventDefault();
    setImgURL(event.target.value);
    if (imgURL !== "") {
      setReq((currentReq) => {
        return { ...currentReq, article_img_url: imgURL };
      });
    }
  }

  return (
    <>
      <section id="article--warning">
        Please ensure that you follow the community rules before posting a new
        article.
      </section>
      <form id="article--form" onSubmit={addNewArticle}>
        <label htmlFor="article--topic">Topic</label>
        <input
          id="article--topic"
          value={req.topic}
          onBlur={handleTopicBlur}
          onChange={handleTopicChange}
          placeholder="topic of your article in 1 word"
          required
        ></input>
        {toggle ? (
          <NewTopic
            topicDescription={topicDescription}
            setTopicDescription={setTopicDescription}
            toggle={toggle}
            isToggled={isToggled}
            req={req}
            setReq={setReq}
            error={error}
            setError={setError}
          />
        ) : null}

        <label htmlFor="article--title">
          An attention-grabbing title for your article
        </label>
        <input
          id="article--title"
          value={req.title}
          onChange={handleTitleChange}
          required
        ></input>
        <label htmlFor="article--body">
          Your article - write to your heart's content
        </label>
        <textarea
          id="article--body"
          value={req.body}
          onChange={handleBodyChange}
          required
        ></textarea>
        <label htmlFor="article--image-url">URL for picture</label>
        <input
          id="article--image-url"
          value={imgURL}
          onChange={handleImgURLChange}
        ></input>
        <button>Submit</button>
      </form>
      <p>{error}</p>
    </>
  );
}
