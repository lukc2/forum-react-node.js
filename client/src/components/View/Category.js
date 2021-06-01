import React, { useState } from "react";
import { Route } from "react-router-dom";
import ThreadList from "./ThreadList";
import ThreadView from "./ThreadView";
import { useParams } from "react-router";
import AddThread from "./AddThread";


export default function Category({ props }) {
  let { id } = useParams();
  const categoriesJSON = [
    {
      id: 1,
      name: "Category 1",
      link: "/category/1",
    },
    {
      id: 2,
      name: "Category 2",
      link: "/category/2",
    },
    {
      id: 3,
      name: "Category 3",
      link: "/category/3",
    }
  ];
  const [threads] = useState([
    {
      id: 1, 
      name: "Hello everyone",
      category_id: 1,
      reputation: 14,
      voted: [],
      created_at: Date.now(),
      updated_at: Date.now(),
      closed: true,
      user_id: 1
    },
    {
      id: 2,
      name: "Where do I find this?",
      category_id: 1,
      reputation: 23,
      voted: [],
      created_at: Date.now(),
      closed: false,
      user_id: 1
    },
    {
      id: 3,
      name: "Why is it so?",
      category_id: 1,
      reputation: 3131,
      voted: [],
      created_at: Date.now(),
      closed: false,
      user_id: 1
    }
  ]);
  return (
    <>
      <Route
        path="/category/:id"
        exact
        component={() => (
          <div>
            <ThreadList category={categoriesJSON.find(v=>v.id === parseInt(id))} source={threads} />
          </div>      
        )}
      />
      <Route path="/category/:id/thread/:id" component={() => <ThreadView />} />
      <Route path="/category/:id/addThread/:id" component={() => <AddThread/>} />
    </>
  );
}
