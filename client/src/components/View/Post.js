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
import UserInfo from "../../utils/UserInfo";
import axios from "axios";
import { toast } from "react-toastify";

const Post = (props) => {
  const [post] = useState(props.post)
  const [edit, setEdit] = useState(false)
  const thumbHandler = (val) => {

    axios({ method: "put", url: "api/forum/"+props.category+"/"+props.post.thread_id,data:{
      postId: props.post.id,
      vote: val
    }  })
    .then((result) => {       
      if (result.data.success) {
        // toast.success(result.data.msg);
      } else {
        console.error(result.data.errors);
        toast.error(result.data.msg);
      }
    })
    .catch((err) => console.log(err));

    // setPost({
    //   id: post.id,
    //   thread_id: post.thread_id,
    //   user_id: post.user_id,
    //   content: post.content,
    //   attachement: post.attachement,
    //   reputation: post.reputation+val,
    //   created_at: post.created_at,
    //   voted: voted,
    //   updated_at: post.updated_at
    // })
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
            {post.user_id===UserInfo.getId() ? <button className={styles.editButton} onClick={handleEdit}>Edit</button> :<></>}
            {edit ? <EditPost post={post}/> :  items()}               

          <div className="border-top">
            <div className="col-5 float-left">       
              <div style={post.voted.includes(UserInfo.getId())?{pointerEvents: "none", opacity: "0.4"}:{opacity: "1"}}>
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
