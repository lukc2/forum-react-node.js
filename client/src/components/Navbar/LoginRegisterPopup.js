import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../../styles/components/LoginRegisterPopup.module.css";
import Login from "./Login";
import Register from "./Register";
export default function LoginRegisterPopup(props) {
	const [showRegister, setShowRegister] = useState(false);
	const toggleShowRegister = () => {
		setShowRegister(!showRegister);
	};
	return (
		<div
			className={
				showRegister ? styles.popup_register : styles.popup_login
			}
		>
			<div
				className={
					showRegister
						? styles.popup_inner_register
						: styles.popup_inner_login
				}
			>
				<div className={styles.close_x} onClick={props.closePopup}>
					X
				</div>
				{showRegister ? (
					<Register closePopup={props.closePopup} />
				) : (
					<Login closePopup={props.closePopup} />
				)}
				<div>
					{showRegister ? (
						<span className={styles.change_form}>
							Already have an account?
							<Button onClick={toggleShowRegister}>Log In</Button>
						</span>
					) : (
						<span className={styles.change_form}>
							Don't have an account?
							<Button onClick={toggleShowRegister}>
								Register
							</Button>
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
// source: https://www.skptricks.com/2019/01/create-simple-popup-example-in-react.html
