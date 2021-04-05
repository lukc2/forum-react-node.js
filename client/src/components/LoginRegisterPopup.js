import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/components/LoginRegisterPopup.module.css";
import Login from "./Login";
import Register from "./Register";
export default function LoginRegisterPopup(props) {
	const [showRegister, setShowRegister] = useState(false);
	const toggleShowRegister = () => {
		setShowRegister(!showRegister);
	};
	return (
		<div className={styles.popup}>
			<div className={styles.popup_inner}>
				{showRegister ? (
					<Register closePopup={props.closePopup} />
				) : (
					<Login closePopup={props.closePopup} />
				)}
				<div>
					{showRegister ? (
						<span>
							Already have an account?{" "}
							<Button onClick={toggleShowRegister}>Log In</Button>
						</span>
					) : (
						<span>
							Don't have an account?{" "}
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
