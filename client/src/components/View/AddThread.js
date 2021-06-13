import React from "react";
import axios from "axios";
import styles from "../../styles/components/AddThread.module.css";
import Card from "react-bootstrap/Card";
import {useState} from "react";
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const AddThread = (props) => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [attachement, setAttachement] = useState('')
    //const activeUser = 0;
    let { id } = useParams();

    const addThread = async () => {
		axios.post("/api/forum/"+props.id+"/addThread", {
            title: name,
            content: content,
            attachement: attachement
        }  )
			.then((result) => {       
                 console.log(result.data);
                if (result.data.success) {
                    toast.success(result.data.msg); 
                    setName("")
                    setContent("")
                    setAttachement("")
                    history.push("/category/"+props.id);             
                    } else {
                    console.error(result.data.errors);
                    result.data.errors.errors.forEach(element => {
                        toast.error(element.msg);
                    }); 
                    
                  }
               
			})
			.catch((err) => console.log(err));
	};

    

    const PostHandler = (e) =>{
        e.preventDefault()
        addThread()       
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
