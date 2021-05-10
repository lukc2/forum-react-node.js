import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Category from "./components/View/Category";
import Profile from "./Profile";
import OurNavbar from "./components/Navbar/Navbar";
import React, { useState } from "react";
import Home from "./Home";
// import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <OurNavbar search={search} setSearch={setSearch} />
      <Container fluid>
        <Route path="/category/:id" component={Category}></Route>
        <Route path="/profile" component={Profile} />

        <Route path="/" exact component={Home} />
      </Container>
      <Switch></Switch>
    </BrowserRouter>
  );
}

export default App;
