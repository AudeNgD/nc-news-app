//DEPRECATED AND REPLACED WITH TopicLinks component

import { useEffect, useState } from "react";
import { fetchTopics } from "../../utils/api";
import { Link } from "react-router-dom";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      {isLoadingTopics ? (
        <p className="loading--message">...loading topics</p>
      ) : (
        <>
          <h2>All topics</h2>
          <div className="error--message"> {error}</div>
          <div id="topics-deck">
            {topics.map((topic) => {
              return (
                <button className="topic-button" key={topic.slug}>
                  <Link to={`/home/topics/${topic.slug}`}>{topic.slug}</Link>
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
