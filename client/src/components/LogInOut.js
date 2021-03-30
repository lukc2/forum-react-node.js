import React from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserInfo from "../utils/UserInfo";
export default function LogInOut() {
	const loggedIn = (
		<span>
			<NavDropdown title="UserName">
				<LinkContainer to="/profile">
					<NavDropdown.Item>Profile</NavDropdown.Item>
				</LinkContainer>
				<LinkContainer to="/signOut">
					<NavDropdown.Item>SignOut</NavDropdown.Item>
				</LinkContainer>
			</NavDropdown>
		</span>
	);
	const signIn = (
		<span>
			<LinkContainer to="/register">
				<Button>Register</Button>
			</LinkContainer>
		</span>
	);
	return UserInfo.getLoggedIn() ? loggedIn : signIn;
}
