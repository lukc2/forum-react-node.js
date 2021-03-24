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
export default function OurNavbar() {
	return (
		<Navbar expand="lg" sticky="top">
			<Navbar.Brand href="/">Forum</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic navbar-nav" />
			<NavbarCollapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<NavDropdown title="Category" id="basic-nav-dropdown">
						<LinkContainer to="/category">
							<NavDropdown.Item>Kategoria 1</NavDropdown.Item>
						</LinkContainer>
					</NavDropdown>
				</Nav>
				<Form inline className="mr-sm-2">
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
