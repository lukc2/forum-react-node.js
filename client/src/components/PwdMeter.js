import React from "react";
import styles from "../styles/PwdMeter.module.css";
import zxcvbn from "zxcvbn";
export default function PwdMeter({ password }) {
	const testResult = zxcvbn(password);
	const progressbarCss = (result) => {
		switch (result) {
			case 0:
				return styles.strength_Weak;
			case 1:
				return styles.strength_Weak;
			case 2:
				return styles.strength_Fair;

			case 3:
				return styles.strength_Good;

			case 4:
				return styles.strength_Strong;

			default:
				return styles.strength_Weak;
		}
	};
	const labelText = (result) => {
		switch (result) {
			case 0:
				return "Weak";
			case 1:
				return "Weak";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "Weak";
		}
	};

	return (
		<div>
			<progress
				value={testResult.score}
				max="4"
				className={progressbarCss(testResult.score)}
			/>
			<br />
			<label className={styles.label}>
				<strong>Password Strength:</strong>
				<span>{labelText(testResult.score)}</span>
			</label>
		</div>
	);
}
