import React from "react";

import styles from "../../styles/components/AddPost.module.css";
import Card from "react-bootstrap/Card";
import UserStats from "./UserStats";
import {useState} from "react";


const AddPost = (props) => {
    const [content, setContent] = useState('')
    const [attachement, setAttachement] = useState('')

    const PostHandler = (e) =>{
        //e.preventDefault()
        const post =  {
            id: 0,
            thread_id: parseInt(props.id),
            user_id: props.activeUser,
            content: content,
            attachement: attachement,
            reputation: 0,
            created_at: Date.now(),
            voted: []
        }  
    }
    return (
    <div className={styles.container}>

        <Card>        
        <Card.Body>
                <b>Create new post</b>
                <form>                  
                    <textarea type="text" className={styles.content} onChange={(e)=>setContent(e.target.value)}/>
                    Media link:  <br/>
                    <input type="text" className={styles.attachment} onChange={(e)=>setAttachement(e.target.value)}/>
                    {" "}(youtube, soundcloud, image source, etc.)
                    <div className={styles.postButton} onClick={PostHandler}><button >Post</button></div>
                    
                </form>           
        </Card.Body>
        </Card>
    </div>
    );
};
export default AddPost;
