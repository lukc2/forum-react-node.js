import React from "react";

import styles from "../../styles/components/Post.module.css";
import Card from "react-bootstrap/Card";
import { faThumbsUp, faThumbsDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";
import UserStats from "./UserStats";
import {useState} from "react";
import Embed  from 'react-embed';
import isImageUrl from 'is-image-url';
import EditPost from "./EditPost";

const Post = (props) => {
  const [post, setPost] = useState(props.post)
  const [voted, setVoted] = useState(post.voted)
  const [edit, setEdit] = useState(false)
  const thumbHandler = (val) => {
    if(post.voted.includes(props.activeUser)){
      setVoted(post.voted.filter(v => v !== props.activeUser))
    }else{
      setVoted([...post.voted, props.activeUser])
    }
    setPost({
      id: post.id,
      thread_id: post.thread_id,
      user_id: post.user_id,
      content: post.content,
      attachement: post.attachement,
      reputation: post.reputation+val,
      created_at: post.created_at,
      voted: voted,
      updated_at: post.updated_at
    })
  }
  var postDate = Moment(props.post.timestamp).format("DD.MM.yyy hh:mm");
  var embed;
  if (isImageUrl(post.attachement)) { 
    embed = <a href={post.attachement}><img  alt='' src={post.attachement} /> </a>
  } else {
    embed = <Embed  url={post.attachement}/>
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit)
  }

  function items (){
    return(
      <div>
        
        {post.content} <div className={styles.embed}>{embed}</div>
        <div className={styles.textLeft}> 
              {post.created_at<post.updated_at ? "(Edited)" : ""}
        </div>
        
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <span className={styles.userInfo}>
        <UserStats user = {props.user}></UserStats>
      </span>

      <Card>
        <Card.Body>         
            {post.user_id===props.activeUser ? <button className={styles.editButton} onClick={handleEdit}>Edit</button> :<></>}
            {edit ? <EditPost post={post}/> :  items()}               

          <div className="border-top">
            <div className="col-5 float-left">       
              <div style={voted.includes(props.activeUser)?{pointerEvents: "none", opacity: "0.4"}:{opacity: "1"}}>
                <div onClick={() => thumbHandler(1)} className={styles.thumbsUp}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div
                  onClick={() => thumbHandler(-1)}
                  className={styles.thumbsDown}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </div>
              </div>
              <div className={styles.reps}>{post.reputation}</div>
            </div>
            <span className={styles.statsThread}>
              <span className="float-right"> 
              <FontAwesomeIcon icon={faCalendar} /> :{" "}
                {Moment(postDate).format("DD.MM.yyy hh:mm")}    
              </span>
             
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Post;
