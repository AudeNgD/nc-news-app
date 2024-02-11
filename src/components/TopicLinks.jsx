import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchTopics } from "../../utils/api";
import ExistingTopicsContext from "../contexts/ExistingTopicsContext";

export default function TopicLinks() {
  // const [topics, setTopics] = useState([]);
  const { topics, setTopics } = useContext(ExistingTopicsContext);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [error, setError] = useState(null);
  const [toggled, isToggled] = useState(true);

  useEffect(() => {
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
        setError(null);
        setIsLoadingTopics(false);
      })
      .catch((err) => {
        setError("Cannot fetch topics at this time. Please try again later!");
        setIsLoadingTopics(false);
      });
  }, [setTopics]);

  function handleToggleClick(event) {
    event.preventDefault();
    toggled ? isToggled(false) : isToggled(true);
  }
  return (
    <>
      {isLoadingTopics ? (
        <p className="loading--message">...loading topics</p>
      ) : (
        <>
          {toggled ? (
            <>
              <h3>
                TOPICS
                <button
                  onClick={handleToggleClick}
                  className="sidebar--button-toggle"
                >
                  &#8593;
                </button>
              </h3>

              <ul id="topics--menu">
                {topics.map((topic) => {
                  return (
                    <li key={topic.slug}>
                      <Link to={`/home/topics/${topic.slug}`}>
                        {topic.slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <h3>
                TOPICS
                <button
                  onClick={handleToggleClick}
                  className="sidebar--button-toggle"
                >
                  &#8595;
                </button>
              </h3>
            </>
          )}
        </>
      )}
    </>
  );
}
