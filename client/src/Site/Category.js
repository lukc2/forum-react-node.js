import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ThreadList from "../components/View/ThreadList";
import ThreadView from "../components/View/ThreadView";
import { useParams } from "react-router";
import AddThread from "../components/View/AddThread";
import axios from "axios";

export default function Category({ match }) {
  let { id } = useParams();
  const [category, setCategory] = useState([
    // {
    //   id: 1,
    //   name: "Category 1",
    //   link: "/category/1",
    // },
    // {
    //   id: 2,
    //   name: "Category 2",
    //   link: "/category/2",
    // },
    // {
    //   id: 3,
    //   name: "Category 3",
    //   link: "/category/3",
    // }
  ]);

  const [threads, setThreads] = useState([
	// 	{
	// 		id: 1,
	// 		name: "Hello everyone",
	// 		category_id: 1,
	// 		reputation: 14,
	// 		voted: [],
	// 		created_at: Date.now(),
	// 		updated_at: Date.now(),
	// 		closed: true,
	// 		user_id: 1,
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Where do I find this?",
	// 		category_id: 1,
	// 		reputation: 23,
	// 		voted: [],
	// 		created_at: Date.now(),
	// 		closed: false,
	// 		user_id: 1,
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Why is it so?",
	// 		category_id: 1,
	// 		reputation: 3131,
	// 		voted: [],
	// 		created_at: Date.now(),
	// 		closed: false,
	// 		user_id: 1,
	// 	},
	// 
	]);

		
	const getThreads = async () => {
		axios({ method: "get", url: "api/forum/"+id })
			.then((result) => {
				const data = {
						id: result.data.id,
						name: result.data.name,
						link: `/category/${result.data.id}`,
					};

        		console.log(result.data);
				setCategory(data);
				setThreads(result.data.thread);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getThreads();
		
	}, []);
  return (
    <>
      <Route
        path="/category/:id"
        exact
        component={() => (
          <div>
            <ThreadList category={category} source={threads} />
          </div>      
        )}
      />
      <Route path="/category/:id/thread/:id" component={() => <ThreadView id={id} />} />
      <Route path="/category/:id/addThread" component={() => <AddThread id={id}/>} />
    </>
  );
}
