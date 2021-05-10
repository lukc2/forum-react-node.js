import React from "react";

import styles from "../../styles/components/Post.module.css";
import Card from "react-bootstrap/Card";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";

const Post = (props) => {
  // const [post, setPost] = useState(props.post)
  const thumbHandler = (val) => {
    //     setPost(post => ({
    //     "id": post.id,
    //     "user_id": post.user_id,
    //     "content": post.content,
    //     "reputation": post.reputation+val,
    //     "timestamp": post.timestamp
    // })
  };
  var postDate = Moment(props.post.timestamp).format("DD.MM.yyy hh:mm");

  return (
    <div className={styles.container}>
      <span className={styles.userInfo}>
        <div></div>
      </span>

      <Card>
        <Card.Body>
          <Card.Text>
            <div className="">{props.post.content}</div>
          </Card.Text>

          <div className="border-top">
            <div className="col-5 float-left">
              <div onClick={() => thumbHandler(1)} className={styles.thumbsUp}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </div>
              <div
                onClick={() => thumbHandler(-1)}
                className={styles.thumbsDown}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className={styles.reps}>{props.post.reputation}</div>
            </div>
            <span className={styles.statsThread}>
              <span className="float-right">{postDate}</span>
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Post;
