import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../../utils/UserInfo";
import styles from "../../styles/components/Login.module.css";
import axios from "axios";
export default function Login(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [valid, setValid] = useState(false);
	// TODO add locking while waiting for response from backend
	const loginHandler = (e) => {
		setLogin(e.target.value);
		if (e.target.value < 3 && password.length < 3) {
			setValid(false);
		} else {
			setValid(true);
		}
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
		if (e.target.value < 3 && login.length < 3) {
			setValid(false);
		} else {
			setValid(true);
		}
	};
	const submitHandler = () => {
		axios({
			method: "POST",
			url: "/api/login",
			data: {
				login,
				password,
			},
		})
			.then((result) => {
				if (result.data.success === true) {
					UserInfo.setNickname(result.data.nickname);
					UserInfo.setId(parseInt(result.data.userId));
					UserInfo.setRank(parseInt(result.data.rank));
					UserInfo.setLoggedIn(true); //zalogowany
					props.closePopup();
				} else {
					// TODO proper error message
					console.log(result.data.errors);
				}
			})
			.catch((error) => console.log(error));
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
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						onChange={passwordHandler}
					></Form.Control>
				</Form.Group>
			</Form>
			<Button
				className={styles.button}
				onClick={submitHandler}
				disabled={!valid}
			>
				Log in
			</Button>
		</div>
	);
}
