import React from "react";

import styles from "../../styles/components/AddThread.module.css";
import Card from "react-bootstrap/Card";
import {useState} from "react";
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { useParams } from "react-router";

const AddThread = (props) => {
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [attachement, setAttachement] = useState('')
    const activeUser = 0;
    let { id } = useParams();

    const PostHandler = (e) =>{
        e.preventDefault()
        const thread = {
            name: name,
            category_id: parseInt(id),
            reputation: 0,
            voted: [],
            created_at: Date.now(),
            updated_at: Date.now(),
            closed: false,
            user_id: activeUser
        }
        // const post =  {
        //     thread_id: parseInt(props.id),
        //     user_id: props.activeUser,
        //     content: content,
        //     attachement: attachement,
        //     reputation: 0,
        //     created_at: Date.now(),
        //     updated_at: Date.now(),
        //     voted: []
        // }  
    }
    return (
    <div className={styles.container}>
        <form> 
           <h3> Add new Thread</h3>
            <Card>        
                <Card.Body>
                    Thread Name:<br/>
                    <textarea rows="3" type="text" className={styles.threadName} onChange={(e)=>setName(e.target.value)}/>
                </Card.Body>
            </Card>
            <Card>        
            <Card.Body>
                    <b>Create first post</b>
                                    
                        <textarea type="text" className={styles.content} onChange={(e)=>setContent(e.target.value)}/>
                        Media link:  <br/>
                        <input type="text" className={styles.attachment} onChange={(e)=>setAttachement(e.target.value)}/>
                        {" "}(youtube, soundcloud, image source, etc.)
                        <div className={styles.postButton} onClick={PostHandler}><button >Post</button></div>
                        
                            
            </Card.Body>
            </Card>
        </form> 
    </div>
    );
};
export default AddThread;
