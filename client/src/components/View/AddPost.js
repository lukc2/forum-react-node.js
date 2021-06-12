import React from "react";

import styles from "../../styles/components/AddPost.module.css";
import Card from "react-bootstrap/Card";
import UserStats from "./UserStats";
import {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = (props) => {
    const history = useHistory();
    const [content, setContent] = useState('')
    const [attachement, setAttachement] = useState('')

    const addPost = async () => {
		axios({ method: "post", url: "api/forum/"+props.category+"/"+props.thread,data:{
            content: content,
            attachement: attachement
        }  })
			.then((result) => {   
                if (result.data.success) {
                    toast.success(result.data.msg); 
                    history.push("/category/"+props.category+"/"+props.thread);             
                } else {
                    console.error(result.data.errors);
                    toast.error(result.data.errors);
                  }    
                console.log(result.data);
                
			})
			.catch((err) => console.log(err));
	};

    const PostHandler = (e) =>{
        e.preventDefault()
        addPost()
        // const post =  {
        //     id: 0,
        //     thread_id: parseInt(props.id),
        //     user_id: props.activeUser,
        //     content: content,
        //     attachement: attachement,
        //     reputation: 0,
        //     created_at: Date.now(),
        //     voted: []
        // }  
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
