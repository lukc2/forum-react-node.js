import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../../utils/UserInfo";
import styles from "../../styles/components/Register.module.css";
import Password from "../Password";
import axios from "axios";

export default function Register(props) {
	const [login, setLogin] = useState("");
	const [nickName, setNickName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [validLogin, setValidLogin] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		//* validation
		const err = [];
		let loginValid = true;
		let passwordValid = true;
		if (login.length < 4) {
			err.push("Login must be at least 4 characters");
			loginValid = false;
		}
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				email
			)
		) {
			err.push("Incorect email address");
		}
		if (nickName.length < 4) {
			err.push("Nickname must be at least 4 characters");
		}
		setErrors(err);
		setValidLogin(loginValid);
		setValidPassword(passwordValid);
	}, [login, password, email, nickName]);

	const submitHandler = () => {
		//TODO po udanej rejestracji
		console.log(login, password);
		// TODO fix axios
		axios({
			method: "post",
			url: "/api/signin",
			data: { name: nickName, email, login, password },
		})
			.then((result) => {
				if (result.data.success) {
					UserInfo.setLoggedIn(true);
					// TODO FIXME after backend, fix nickname
					UserInfo.setNickname(result.data.nickName);
				} else {
					// TODO proper error messages
					console.error(result.data.errors);
				}
			})
			.catch((err) => {
				console.log(err);
				alert("axios error");
			});
		UserInfo.setNickname("Jakiś nick z bazy");
		UserInfo.setLoggedIn(true);
		props.closePopup();
	};
	const errorsArray = errors.map((err) => <li>{err}</li>);
	return (
		<div className={styles.container}>
			<Form.Group>
				<Form.Label>Login</Form.Label>
				<Form.Control
					type="text"
					onChange={(e) => setLogin(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>NickName</Form.Label>
				<Form.Control
					type="text"
					onChange={(e) => setNickName(e.target.value)}
					value={nickName}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Form.Group>
			<Password
				password={password}
				setPassword={setPassword}
				valid={setValidPassword}
			/>
			{errors.length > 0 ? (
				<div className="alert alert-danger">
					<ul>{errorsArray}</ul>
				</div>
			) : null}
			<Button
				onClick={submitHandler}
				disabled={!validPassword || !validLogin}
				className={styles.button}
			>
				Register
			</Button>
		</div>
	);
}
