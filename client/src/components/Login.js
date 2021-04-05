import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../utils/UserInfo";
export default function Login(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const loginHandler = (e) => {
		setLogin(e.target.value);
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const submitHandler = () => {
		//TODO po udanym zalogowaniu
		console.log(login === password);
		UserInfo.setNickname("Jakiś nick z bazy");
		UserInfo.setLoggedIn(true); //zalogowany
		props.closePopup();
	};
	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Login</Form.Label>
					<Form.Control
						type="text"
						onChange={loginHandler}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						onChange={passwordHandler}
					></Form.Control>
				</Form.Group>
			</Form>
			<Button onClick={submitHandler}>Log in</Button>
		</div>
	);
}
