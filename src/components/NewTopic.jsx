import { postNewTopic } from "../../utils/api";

export default function NewTopic(props) {
  const {
    topicDescription,
    setTopicDescription,
    toggle,
    isToggled,
    req,
    setReq,
    error,
    setError,
  } = props;

  function handleTopicDescriptionChange(event) {
    event.preventDefault();
    setTopicDescription(event.target.value);
  }

  function handleTopicDescriptionClick(event) {
    event.preventDefault();
    isToggled(false);
    postNewTopic({ slug: req.topic, description: topicDescription })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        setError(
          "Cannot create a new topic at this time. Please try again later"
        );
      });
  }

  return (
    <>
      <p>This is a new topic. Congrats! Please tell us more about it -</p>
      <label htmlFor="topic--description">Description</label>
      <textarea
        onChange={handleTopicDescriptionChange}
        id="topic--description"
        value={topicDescription}
        placeholder="short description of the topic"
        required
      ></textarea>

      <button onClick={handleTopicDescriptionClick}>Done!</button>
    </>
  );
}
