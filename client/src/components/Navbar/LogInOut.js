import axios from "axios";
import React, { useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserInfo from "../../utils/UserInfo";
import Popup from "./LoginRegisterPopup";
import style from "../../styles/components/LogInOut.module.css";
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
		<div className={`mt-2 ${style.fixRight}`}>
			<NavDropdown title={UserInfo.getNickname()}>
				<LinkContainer to="/profile">
					<NavDropdown.Item>Profile</NavDropdown.Item>
				</LinkContainer>
				<LinkContainer
					to="/signOut"
					onClick={() => {
						axios({ method: "get", url: "/api/logout" })
							.then((result) => {
								UserInfo.destroy();
								statusChange();
							})
							.catch((err) => console.error(err));
					}}
				>
					<NavDropdown.Item>SignOut</NavDropdown.Item>
				</LinkContainer>
			</NavDropdown>
		</div>
	);
	const signIn = (
		<div className="mt-2">
			<Button onClick={togglePopup}>Log in</Button>
			{showPopup ? <Popup closePopup={togglePopup} /> : null}
		</div>
	);
	return UserInfo.getLoggedIn() ? loggedInDropdown : signIn;
}
