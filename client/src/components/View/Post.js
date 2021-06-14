import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Post.module.css";
import Card from "react-bootstrap/Card";
import { faThumbsUp, faThumbsDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dateFormat from "dateformat";
import UserStats from "./UserStats";
import Embed  from 'react-embed';
import isImageUrl from 'is-image-url';
import EditPost from "./EditPost";
import UserInfo from "../../utils/UserInfo";
import axios from "axios";
import { toast } from "react-toastify";

const Post = (props) => {
  const [post] = useState(props.post)
  const [rep, setRep] = useState(post.reputation);
  const [voted, setVoted] = useState([]);
  const [edit, setEdit] = useState(false)
  const thumbHandler = async (val) => {

    if(UserInfo.getLoggedIn()){
      axios.put("/api/forum/"+props.category+"/"+props.post.thread_id,{
        postId: props.post.id,
        vote: val
      })
      .then((result) => {       
        if (result.data.success===false) {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        } else {
          toast.success(result.data.msg);
          setRep(rep+val)
            setVoted([...voted, UserInfo.getId()])
        }
      })
      .catch((err) => console.log(err));
      }
      else{
        toast.info("Musisz być zalogowany by móc głosować!")
      }
  }

  useEffect(() => {
    if(post.voted.split(',')!==null)
    setVoted(post.voted.split(','))
    else 
      setVoted([])
      	// eslint-disable-next-line react-hooks/exhaustive-deps
  	}, []);
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
        <UserStats ranks={props.ranks} user = {post.user}></UserStats>
      </span>

      <Card>
        <Card.Body>         
            {post.user_id===parseInt(UserInfo.getId()) ? <button className={styles.editButton} onClick={handleEdit}>Edit</button> :<></>}
            {edit ? <EditPost category={props.category} post={post}/> :  items()}               

          <div className="border-top">
            <div className="col-5 float-left">       
              <div style={voted?.includes(UserInfo.getId())?{pointerEvents: "none", opacity: "0.4"}:{opacity: "1"}}>
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
              <div className={styles.reps}>{rep}</div>
            </div>
            <span className={styles.statsThread}>
              <span className="float-right"> 
              <FontAwesomeIcon icon={faCalendar} /> :{" "}
              {dateFormat(props.post.timestamp,"dd.mm.yyyy hh:mm")}
              </span>
             
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Post;
