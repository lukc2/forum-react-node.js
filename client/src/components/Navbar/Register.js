import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserInfo from "../../utils/UserInfo";
import styles from "../../styles/components/Register.module.css";
import PwdMeter from "../PwdMeter";
export default function Register(props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const loginHandler = (e) => {
		setLogin(e.target.value);
	};
	//TODO fix error message text
	const passwordHandler = (e) => {
		setPassword(e.target.value);
		let err = {};
		if (passwordConfirm !== e.target.value) {
			err = { ...err, match: "Passwords do not match!" };
			setValidPassword(false);
		} else {
			setValidPassword(true);
		}
		if (passwordConfirm.length < 3) {
			err = { ...err, length: "Password is to short!" };
			setValidPassword(false);
		}
		setErrors(err);
	};
	const passwordConfirmHandler = (e) => {
		setErrors({});
		setPasswordConfirm(e.target.value);
		if (password !== e.target.value) {
			setErrors({ ...errors, match: "Passwords do not match!" });
			setValidPassword(false);
		} else {
			setValidPassword(true);
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
					<Form.Control type="password" onChange={passwordHandler} />
					<Form.Text>
						Your password must be 4-20 characters long, contain
						letters and numbers
					</Form.Text>
					{password ? <PwdMeter password={password} /> : ""}
					{errors.length ? (
						<div className="text-danger">{errors.length}</div>
					) : (
						""
					)}
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						type="password"
						onChange={passwordConfirmHandler}
					/>
					{errors.match ? (
						<div className="text-danger">{errors.match}</div>
					) : (
						""
					)}
				</Form.Group>
			</Form>
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
