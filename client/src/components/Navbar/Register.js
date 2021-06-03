import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../styles/components/Register.module.css";
import Password from "../Password";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register(props) {
	const [login, setLogin] = useState("");
	const [nickName, setNickName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [validForm, setValidForm] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		//* validation
		const err = [];
		if (login.length < 4) {
			err.push("Login must be at least 4 characters");
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
		setValidForm(err.length > 0 || !validPassword);
	}, [login, email, nickName, validPassword]);

	const submitHandler = () => {
		axios({
			method: "post",
			url: "/api/signin",
			data: { name: nickName, email, login, password },
		})
			.then((result) => {
				if (result.data.success) {
					toast.success("Account created, please log in");
				} else {
					console.error(result.data.errors);
					toast.error("Check console");
					props.closePopup();
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
				disabled={validForm}
				className={styles.button}
			>
				Register
			</Button>
		</div>
	);
}
