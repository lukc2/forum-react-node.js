import React, { useState, useEffect } from "react";
import styles from "../../styles/components/ThreadView.module.css";
import Post from "./Post"
import axios from "axios";
import { toast } from "react-toastify";

const PostList = (props) => {


    const [rank, getRank] =useState([

    ])

    const getRanks = async () => {
		axios.get("localhost:3000/api/forum/ranks")
			.then((result) => {
        if (result.data.success) {
          toast.success(result.data.msg);
          getRanks(result.data);
        } else {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        }
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getRanks();
		
	}, []);
   
   

    const postList = props.source?.map(post => {
		return (
            <Post category={props.category} ranks={rank} key={post.id} post={post}/> 
		)
	  })
    
        return (
            <div className={styles.container}>
            
                {postList}
            </div>
        );


};
export default PostList;
