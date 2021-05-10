import React, { useState } from "react";
import styles from "../../styles/components/ThreadView.module.css";
import Card from "react-bootstrap/Card";
import {
  faThumbsUp,
  faComments,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import PostList from "./PostList";

const ThreadView = () => {
  const thumbHandler = (val) => {
    setThread((thread) => ({
      id: thread.id,
      name: thread.name,
      category_id: thread.category_id,
      reputation: thread.reputation + val,
    }));
  };

  let { id } = useParams();
  const [threads] = useState([
    {
      id: 0,
      name: "Hello everyone",
      category_id: 1,
      reputation: 14,
    },
    {
      id: 1,
      name: "Where do I find this?",
      category_id: 1,
      reputation: 23,
    },
    {
      id: 2,
      name: "Why is it so?",
      category_id: 1,
      reputation: 3131,
    },
  ]);
  const [thread, setThread] = useState(threads[id]);
  const [posts] = useState([
    {
      id: 0,
      user_id: 11,
      content:
        "Hello everyoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      reputation: 14,
      timestamp: Date.now(),
    },
    {
      id: 1,
      user_id: 11,
      content: "No",
      reputation: 14,
      timestamp: Date.now(),
    },
    {
      id: 2,
      user_id: 11,
      content: "Hello everyone",
      reputation: 14,
      timestamp: Date.now(),
    },
  ]);
  return (
    <>
      <div className=" mx-auto w-50">
        <br></br>
        <Card>
          <Card.Header>
            <div className="col-12 w-50">
              <b>
                <h2>{thread.name}</h2>
              </b>
            </div>
            <div className="col-12 border-top">
              <div className="col-5 float-left">
                <div
                  onClick={() => thumbHandler(1)}
                  className={styles.thumbsUp}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div
                  onClick={() => thumbHandler(-1)}
                  className={styles.thumbsDown}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </div>
                <div className={styles.reps}>{thread.reputation}</div>
              </div>
              <span className={styles.statsThread}>
                <span className="col-3 float-right">
                  Posts <FontAwesomeIcon icon={faComments} /> : {posts.length}
                </span>
              </span>
            </div>
          </Card.Header>
        </Card>
      </div>
      <br></br>
      <div className=" ml-auto mr-auto w-75">
        <PostList source={posts} />
      </div>
    </>
  );
};
export default ThreadView;
