import React, { useState } from "react";
import { Route } from "react-router-dom";
import ThreadList from "./ThreadList";
import ThreadView from "./ThreadView";
import { useParams } from "react-router";

export default function Category({ props }) {
  let { id } = useParams();
  const categoriesJSON = [
    {
      id: "1",
      name: "Category 1",
      link: "/category/1",
    },
    {
      id: "2",
      name: "Category 2",
      link: "/category/2",
    },
    {
      id: "3",
      name: "Category 3",
      link: "/category/3",
    },
  ];
  const [threads] = useState([
    {
      id: 0,
      name: "Hello everyone",
      category_id: 1,
      reputation: 14,
    },
    {
      id: 1,
      name: "Where do I find this?",
      category_id: 1,
      reputation: 23,
    },
    {
      id: 2,
      name: "Why is it so?",
      category_id: 1,
      reputation: 3131,
    },
  ]);
  return (
    <>
      <Route
        path="/category/:id"
        exact
        component={() => (
          <ThreadList name={categoriesJSON[id - 1].name} source={threads} />
        )}
      />
      <Route path="/category/:id/thread/:id" component={() => <ThreadView />} />
    </>
  );
}
