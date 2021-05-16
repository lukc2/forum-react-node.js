import React from "react";
import {
	Button,
	Form,
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import LogInOut from "./LogInOut";
import Categories from "../../utils/Categories";
export default function OurNavbar() {
	if (Categories.getCategories() === null) {
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
		Categories.setCategories(categoriesJSON);
	}

	const CategoryDropDownItems =
		Categories.getCategories() === null
			? ""
			: Categories.getCategories().map((item) => {
					return (
						<LinkContainer to={item.link} key={item.id}>
							<NavDropdown.Item key={item.id}>
								{item.name}
							</NavDropdown.Item>
						</LinkContainer>
					);
			  });
	return (
		<Navbar expand="lg" sticky="top" bg="light">
			<LinkContainer to="/">
				<Navbar.Brand href="/">Forum</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic navbar-nav" />
			<NavbarCollapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<NavDropdown title="Category" id="basic-nav-dropdown">
						{CategoryDropDownItems}
					</NavDropdown>
				</Nav>
				<Form inline className="mr-sm-2">
					{/*TODO Wyrzucić do komponentu, szukanie wątków */}
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="outline-primary">Search</Button>
				</Form>

				<LogInOut />
			</NavbarCollapse>
		</Navbar>
	);
}
