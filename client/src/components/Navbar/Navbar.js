import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import LogInOut from "./LogInOut";
import SearchBar from "./SearchBar";
import axios from "axios";
import UserInfo from "../../utils/UserInfo";
export default function OurNavbar() {
	const [reload, setReload] = useState(false);
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
	const categories = useRef(categoriesJSON);
	useEffect(() => {
		axios({ method: "get", url: "/api/forum/" })
			.then((result) => {
				const data = result.data?.map((item) => {
					return {
						id: item.id,
						name: item.name,
						link: `/category/${item.id}`,
					};
				});
				categories.current = data;
				setReload(!reload);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const CategoryDropDownItems =
		categories.current === null
			? ""
			: categories.current.map((item) => {
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
					<NavDropdown title="Categories" id="basic-nav-dropdown">
						{CategoryDropDownItems}
					</NavDropdown>
					{UserInfo.getLoggedIn() && UserInfo.getRank() === "1" ? (
						<LinkContainer to="/admin">
							<Nav.Link>Admin panel</Nav.Link>
						</LinkContainer>
					) : null}
				</Nav>
				<SearchBar />
				<LogInOut />
			</NavbarCollapse>
		</Navbar>
	);
}
