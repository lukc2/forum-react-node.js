import React, { useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserInfo from "../../utils/UserInfo";
import Popup from "./LoginRegisterPopup";
export default function LogInOut() {
	const [showPopup, setPopup] = useState(false);
	const togglePopup = () => {
		setPopup(!showPopup);
	};
	const [status, setStatus] = useState(false);
	const statusChange = () => {
		setStatus(!status); //forces render
	};

	const loggedInDropdown = (
		<span>
			<NavDropdown title={UserInfo.getNickname()}>
				<LinkContainer to="/profile">
					<NavDropdown.Item>Profile</NavDropdown.Item>
				</LinkContainer>
				<LinkContainer
					to="/signOut"
					onClick={() => {
						UserInfo.destroy();
						statusChange(); //* TODO better way to do this
					}}
				>
					<NavDropdown.Item>SignOut</NavDropdown.Item>
				</LinkContainer>
			</NavDropdown>
		</span>
	);
	const signIn = (
		<span>
			<Button onClick={togglePopup}>Log in</Button>
			{showPopup ? <Popup closePopup={togglePopup} /> : null}
		</span>
	);
	return UserInfo.getLoggedIn() ? loggedInDropdown : signIn;
}
