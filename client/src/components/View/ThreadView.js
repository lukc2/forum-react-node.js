import React, { useState, useEffect } from "react";
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
import AddPost from "./AddPost";
import axios from "axios";
import UserInfo from "../../utils/UserInfo";
import { toast } from "react-toastify";

const ThreadView = (props) => {

  let { id }= useParams();

  const [thread, setThread] = useState([]);
  
  
	const getThread = async () => {
		axios({ method: "get", url: "/api/forum/"+props.id+"/"+id})
			.then((result) => {
        if (result.data.success===false) {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        } else {
          setThread(result.data[0]);
          //console.log(result.data)
        }
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getThread();
		
	}, []);


  const thumbHandler = (val) => {
      axios({ method: "put", url: "api/forum/"+id,data:{
              threadId: id,
              vote: val
          }  })
        .then((result) => {       
          console.log(result.data);
          getThread(); 
        })
        .catch((err) => console.log(err));
 
    // setThread((thread) => ({
    //   id: thread.id,
    //   name: thread.name,
    //   category_id: thread.category_id,
    //   reputation: thread.reputation + val,
    //   voted: voted,
    //   created_at: thread.created_at,
    //   closed: thread.closed,
    //   user_id: thread.user_id
    // }));

  };
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
                <div style={thread.votes?.includes(UserInfo.getId())?{pointerEvents: "none", opacity: "0.4"}:{opacity: "1"}}>
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
                </div> 
                <div className={styles.reps}>{thread.reputation}</div>
              </div>
              <span className={styles.statsThread}>
                <span className="col-3 float-right">
                  Posts <FontAwesomeIcon icon={faComments} /> : {thread.posts?.length}
                </span>
              </span>
            </div>
          </Card.Header>
        </Card>
      </div>
      <br></br>
      <div className=" ml-auto mr-auto w-75">
        <AddPost thread={id} category={thread.category_id}/>
        <PostList category={thread.category_id} source={thread.posts} />
      </div>
    </>
  );
};
export default ThreadView;
