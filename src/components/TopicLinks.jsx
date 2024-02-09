import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchTopics } from "../../utils/api";
import ExistingTopicsContext from "../contexts/ExistingTopicsContext";

export default function TopicLinks() {
  // const [topics, setTopics] = useState([]);
  const { topics, setTopics } = useContext(ExistingTopicsContext);
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
          <ul id="topics--menu">
            {topics.map((topic) => {
              return (
                <li key={topic.slug}>
                  <Link to={`/home/topics/${topic.slug}`}> {topic.slug}</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
