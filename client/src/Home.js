import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Categories from "./utils/Categories";
import ThreadList from "./components/View/ThreadList";
export default function Home() {
  //Zastąpić przez pobranie z bazy
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
  ];
  const threads = [
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
  ];

  Categories.setCategories(categoriesJSON);
  //   const categoriesList = categoriesJSON.map((item) => {
  //     return (
  //       <Row key={item.id}>
  //         <Link to={item.link}>
  //           <Col>{item.id}</Col>
  //           <Col>{item.name}</Col>
  //         </Link>
  //       </Row>
  //     );
  //   });
  return (
    <Container>
      <Row>
        <Col>Home page</Col>
      </Row>
      {/* {categoriesList} */}

      <ThreadList name="Last popular:" source={threads} />
    </Container>
  );
}
