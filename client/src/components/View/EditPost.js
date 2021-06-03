import React from "react";

import styles from "../../styles/components/AddPost.module.css";
import Card from "react-bootstrap/Card";
//import UserStats from "./UserStats";
import {useState} from "react";


const EditPost = (props) => {
    const [content, setContent] = useState(props.post.content)
    const [attachement, setAttachement] = useState(props.post.attachement)

    const PostHandler = (e) =>{
        e.preventDefault()
        // const post =  {
        //     id: props.post.id,
        //     thread_id: parseInt(props.id),
        //     user_id: props.activeUser,
        //     content: content,
        //     attachement: attachement,
        //     reputation: props.post.reputation,
        //     created_at: props.post.created_at,
        //     updated_at: Date.now(),
        //     voted: props.post.voted
        // }  
    }
    return (
    <div className={styles.container}>

        <Card>        
        <Card.Body>
                <b>Edit post</b>
                <form>                  
                    <textarea type="text" value={content} className={styles.content} onChange={(e)=>setContent(e.target.value)}/>
                    Media link:  <br/>
                    <input type="text" value={attachement} className={styles.attachment} onChange={(e)=>setAttachement(e.target.value)}/>
                    {" "}(youtube, soundcloud, image source, etc.)
                    <div className={styles.postButton} onClick={PostHandler}><button >Confirm</button></div>
                    
                </form>           
        </Card.Body>
        </Card>
    </div>
    );
};
export default EditPost;
