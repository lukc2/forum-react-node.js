import React, { useState, useEffect } from "react";
import styles from "../../styles/components/ThreadView.module.css";
import Post from "./Post"
import axios from "axios";
import { toast } from "react-toastify";

const PostList = (props) => {


    const [ranks, setRanks] =useState([])

    const getRanks = async () => {
      //http://localhost:3000/api/forum/ranks
      axios({ method: "get", url: "/api/forum/ranks"})
			.then((result) => {
        if (result.data.success===false) {
          console.error(result.data.errors);
          toast.error(result.data.msg);
        } else {
          setRanks(result.data);
        }
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getRanks();
		
	}, []);
   
   

    const postList = props.source?.map(post => {
		return (
            <Post category={props.category} ranks={ranks} key={post.id} post={post}/> 
		)
	  })
    
        return (
            <div className={styles.container}>
            
                {postList}
            </div>
        );


};
export default PostList;
