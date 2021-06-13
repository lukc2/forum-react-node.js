import React from "react";

import styles from "../../styles/components/AddPost.module.css";
import Card from "react-bootstrap/Card";
//import UserStats from "./UserStats";
import {useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";


const EditPost = (props) => {
    const [content, setContent] = useState(props.post.content)
    const [attachement, setAttachement] = useState(props.post.attachement)

    const PostHandler = (e) =>{
        e.preventDefault()

        axios.patch("/api/forum/"+props.category+"/"+props.post.thread_id, {
            postId: props.post.id,
            content: content,
            attachement: attachement
        })
			.then((result) => {
        if (result.data.success) {
          toast.success(result.data.msg);
          history.push("/category/"+props.category+"/"+props.post.thread_id);
        } else {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        }
			})
			.catch((err) => console.log(err));
	};
    
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
