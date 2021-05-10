import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Thread.module.css";
import Card from "react-bootstrap/Card";
import { faThumbsUp, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Thread = (props) => {
  return (
    <div className=" mx-auto w-75">
      <Card>
        <Card.Body>
          <Card.Title>
            <Link
              to={
                "/category/" +
                props.thread.category_id +
                "/thread/" +
                props.thread.id
              }
              className="col-12 "
            >
              <b>{props.thread.name}</b>
            </Link>
          </Card.Title>

          <div className="col-12 border-top">
            <span className={styles.statsThread}>
              <div className="col-5 float-left">
                <span>
                  Reputation <FontAwesomeIcon icon={faThumbsUp} /> :{" "}
                  {props.thread.reputation}
                </span>
              </div>

              <span className="col-3 float-right">
                Posts <FontAwesomeIcon icon={faComments} /> :{" "}
                {props.thread.reputation}
              </span>
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Thread;
