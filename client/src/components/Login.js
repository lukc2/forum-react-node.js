import React from "react";
import UserInfo from "../utils/UserInfo";
export default function Login() {
	UserInfo.setNickname("Jakiś nick z bazy");
	UserInfo.setLoggedIn(true); //zalogowany
	return <div></div>;
}
