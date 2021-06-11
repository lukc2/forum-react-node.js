import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import UserInfo from "../../utils/UserInfo";
import styles from "../../styles/components/Login.module.css";
import axios from "axios";
export default function Login(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [valid, setValid] = useState(false);
	const [lock, setLock] = useState(false);
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
		setLock(true);
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
					UserInfo.setLoggedIn(true);
					toast.success(result.data.msg);
					props.closePopup();
				} else {
					result.data.errors?.map((error) => toast.error(error.msg));
				}
				setLock(false);
			})
			.catch((error) => {
				console.log(error);
				setLock(false);
			});
	};
	return (
		<div className={styles.container}>
			<Form>
				<Form.Group>
					<Form.Label>Login</Form.Label>
					<Form.Control
						type="text"
						onChange={loginHandler}
						disabled={lock}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						onChange={passwordHandler}
						disabled={lock}
					/>
				</Form.Group>
			</Form>
			<Button
				className={styles.button}
				onClick={submitHandler}
				disabled={!valid || lock}
			>
				Log in
			</Button>
		</div>
	);
}
