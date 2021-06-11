import React from "react";
import styles from "../../styles/components/ThreadView.module.css";
import Post from "./Post"
import {useState} from "react";

const PostList = (props) => {

    const [ranks] = useState([
        {
          id: 1,
          name: "Admin",
          created_at: Date.now()
        },
        {
          id: 2,
          name: "Mod",
          created_at: Date.now()
        },
        {
          id: 3,
          name: "Basic",
          created_at: Date.now()
        },
      ]);
    
   

    const postList = props.source?.map(post => {
		return (
            <Post category={props.category} key={post.id} post={post}/> 
		)
	  })
    
        return (
            <div className={styles.container}>
            
                {postList}
            </div>
        );


};
export default PostList;
