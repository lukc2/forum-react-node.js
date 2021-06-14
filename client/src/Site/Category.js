import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import ThreadList from "../components/View/ThreadList";
import ThreadView from "../components/View/ThreadView";
import { useParams } from "react-router";
import AddThread from "../components/View/AddThread";
import axios from "axios";

export default function Category({ match }) {

  let { id } = useParams();
  const [category, setCategory] = useState([]);

  const [threads, setThreads] = useState([]);

		
	const getThreads = async () => {
		axios({ method: "get", url: "/api/forum/"+id })
			.then((result) => {
				const cat = {
						id: result.data[0].id,
						name: result.data[0].name,
						link: `/category/${result.data[0].id}`,
					};

        		//console.log(result.data[0]);
				setCategory(cat);
				setThreads(result.data[0].threads);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getThreads();		

	// eslint-disable-next-line react-hooks/exhaustive-deps
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
