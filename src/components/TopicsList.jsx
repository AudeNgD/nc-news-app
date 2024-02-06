import { useEffect, useState } from "react";
import { fetchTopics } from "../../utils/api";
import { Link } from "react-router-dom";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTopics]);

  return (
    <>
      <h2>All topics</h2>
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
  );
}
