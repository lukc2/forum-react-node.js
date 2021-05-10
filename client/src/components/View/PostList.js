import React from "react";

import styles from "../../styles/components/ThreadView.module.css";

import Post from "./Post"

const PostList = (props) => {

    const postList = props.source.map(post => {
		return (
            <Post key={post.id} post={post}/> 
		)
	  })
    
        return (
            <div className={styles.container}>
            
                {postList}
            </div>
        );


};
export default PostList;
