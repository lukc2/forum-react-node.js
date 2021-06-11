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

  let { id } = useParams();
  // const [threads] = useState([
  //   // {
  //   //   id: 1, 
  //   //   name: "Hello everyone",
  //   //   category_id: 1,
  //   //   reputation: 14,
  //   //   voted: [],
  //   //   created_at: Date.now(),
  //   //   closed: false,
  //   //   user_id: 1
  //   // },
  //   // {
  //   //   id: 2,
  //   //   name: "Where do I find this?",
  //   //   category_id: 1,
  //   //   reputation: 23,
  //   //   voted: [],
  //   //   created_at: Date.now(),
  //   //   closed: false,
  //   //   user_id: 1
  //   // },
  //   // {
  //   //   id: 3,
  //   //   name: "Why is it so?",
  //   //   category_id: 1,
  //   //   reputation: 3131,
  //   //   voted: [],
  //   //   created_at: Date.now(),
  //   //   closed: false,
  //   //   user_id: 1
  //   // }
  // ]);
  const [thread, setThread] = useState([]);
  
  // const [posts] = useState([
  //   // {
  //   //   id: 1,
  //   //   thread_id: parseInt(id),
  //   //   user_id: 1,
  //   //   content:
  //   //     "Hello everyoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  //   //   attachement: 'https://i.imgur.com/HFzYtr2.jpg',
  //   //   reputation: 14,
  //   //   created_at: Date.now(),
  //   //   updated_at: Date.now()+10,
  //   //   voted: []
  //   // },
  //   // {
  //   //   id: 2,
  //   //   user_id: 2,
  //   //   thread_id: parseInt(id),
  //   //   content: "No",
  //   //   attachement: 'https://www.youtube.com/watch?v=YZwSzGYtvWg',
  //   //   reputation: 14,
  //   //   created_at: Date.now(),
  //   //   updated_at: Date.now(),
  //   //   voted: [1,2]
  //   // },
  //   // {
  //   //   id: 3,
  //   //   user_id: 2,
  //   //   thread_id: parseInt(id),
  //   //   attachement: 'https://soundcloud.com/musicbyvander/wii-theme-song-trap-remix',
  //   //   content: "Hello everyone",
  //   //   reputation: 14,
  //   //   created_at: Date.now(),
  //   //   updated_at: Date.now(),
  //   //   voted: [1,2]
  //   // },
  // ]);
	const getThread = async () => {
		axios({ method: "get", url: "api/forum/"+props.id+"/"+id })
			.then((result) => {
        if (result.data.success) {
          toast.success(result.data.msg);
          setThread(result.data);
        } else {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        }
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getThread();
		
	}, []);


  const thumbHandler = (val) => {
      axios({ method: "put", url: "api/forum/"+props.id,data:{
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
                <div style={thread.votes.includes(UserInfo.getId())?{pointerEvents: "none", opacity: "0.4"}:{opacity: "1"}}>
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
                  Posts <FontAwesomeIcon icon={faComments} /> : {thread.posts.length}
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
