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
    
   

    const postList = props.source.map(post => {
        console.log(post)
        const user_temp = props.users.find(a => a.id === post.user_id)
        const user = [user_temp, ranks[user_temp.rank_id-1].name] 

		return (
            <Post key={post.id} activeUser={props.activeUser} user={user} post={post}/> 
		)
	  })
    
        return (
            <div className={styles.container}>
            
                {postList}
            </div>
        );


};
export default PostList;
