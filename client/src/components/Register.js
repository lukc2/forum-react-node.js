import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../utils/UserInfo";

export default function Register(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [submitEnabled, setSubmitEnabled] = useState(false);

	const loginHandler = (e) => {
		setLogin(e.target.value);
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const passwordConfirmHandler = (e) => {
		setPasswordConfirm(e.target.value);
		if (password !== passwordConfirm) {
			//TODO display some text
			setSubmitEnabled(false);
		} else {
			setSubmitEnabled(true);
		}
	};
	const submitHandler = () => {
		//TODO po udanej rejestracji
		console.log(login, password);
		UserInfo.setNickname("Jakiś nick z bazy");
		UserInfo.setLoggedIn(true);
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
				<Form.Group>
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						type="password"
						onChange={passwordConfirmHandler}
					></Form.Control>
				</Form.Group>
			</Form>
			<Button onClick={submitHandler} disabled={submitEnabled}>
				Register
			</Button>
		</div>
	);
}
