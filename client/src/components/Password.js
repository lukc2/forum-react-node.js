import React, { useState, useEffect } from "react";
import PwdMeter from "./PwdMeter";
import { Form } from "react-bootstrap";

export default function Password({
	password,
	setPassword,
	valid = () => {},
	disabled = false,
}) {
	//* setPassword and valid are functions of setState
	//! if you want to use valid to disable fields remember to use "!" disabled={!validValue}
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		//* validation
		const err = {};
		let ok = true;
		if (password.length < 6) {
			err.length = "Passwords must be at least 6 characters";
			ok = false;
		}
		if (password.localeCompare(passwordConfirm) !== 0) {
			err.match = "Passwords do not match";
			ok = false;
		}
		valid(ok);
		setErrors(err);
	}, [password, passwordConfirm, valid]);
	return (
		<>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					disabled={disabled}
				/>
				<Form.Text>
					Your password must be 6-20 characters long, contain letters
					and numbers
				</Form.Text>
				{password ? <PwdMeter password={password} /> : null}
				{errors.length ? (
					<div className="alert alert-danger">{errors.length}</div>
				) : null}
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm password</Form.Label>
				<Form.Control
					type="password"
					onChange={(e) => setPasswordConfirm(e.target.value)}
					disabled={disabled}
				/>
				{errors.match ? (
					<div className="alert alert-danger">{errors.match}</div>
				) : null}
			</Form.Group>
		</>
	);
}
