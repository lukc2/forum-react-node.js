import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../../utils/UserInfo";
import styles from "../../styles/components/Register.module.css";
import Password from "../Password";

export default function Register(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);

	const loginHandler = (e) => {
		setLogin(e.target.value);
	};

	const submitHandler = () => {
		//TODO po udanej rejestracji
		console.log(login, password);
		UserInfo.setNickname("Jakiś nick z bazy");
		UserInfo.setLoggedIn(true);
		props.closePopup();
	};
	return (
		<div className={styles.container}>
			<Form>
				<Form.Group>
					<Form.Label>Login</Form.Label>
					<Form.Control
						type="text"
						onChange={loginHandler}
					></Form.Control>
				</Form.Group>
			</Form>
			<Password
				password={password}
				setPassword={setPassword}
				valid={setValidPassword}
			/>
			<Button
				onClick={submitHandler}
				disabled={!validPassword}
				className={styles.button}
			>
				Register
			</Button>
		</div>
	);
}
