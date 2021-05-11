import React, { useState } from "react";
import PwdMeter from "./PwdMeter";
import { Form } from "react-bootstrap";

export default function Password({
	password,
	setPassword,
	valid,
	disabled = false,
}) {
	//* setPassword and valid are functions of setState
	//! if you want to use valid to disable fields remember to use "!" disabled={!validValue}
	const [passwordField, setPasswordField] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState({});

	const passwordHandler = (e) => {
		setPasswordField(e.target.value);
		let err = {};
		if (passwordConfirm !== e.target.value) {
			if (passwordConfirm.localeCompare("") === 0)
				// err = { ...err, match: "Passwords do not match!" };
				valid(false);
		} else {
			valid(true);
		}
		if (passwordField.length < 3) {
			err = { ...err, length: "Password is to short!" };
			valid(false);
		}
		setPassword(e.target.value);
		setErrors(err);
	};
	const passwordConfirmHandler = (e) => {
		setErrors({});
		setPasswordConfirm(e.target.value);
		if (passwordField !== e.target.value) {
			setErrors({ ...errors, match: "Passwords do not match!" });
			valid(false);
		} else {
			valid(true);
		}
		setPassword(e.target.value);
	};
	return (
		<>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					onChange={passwordHandler}
					disabled={disabled}
				/>
				<Form.Text>
					Your password must be 4-20 characters long, contain letters
					and numbers
				</Form.Text>
				{password ? <PwdMeter password={passwordField} /> : ""}
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
					disabled={disabled}
				/>
				{errors.match ? (
					<div className="text-danger">{errors.match}</div>
				) : (
					""
				)}
			</Form.Group>
		</>
	);
}
