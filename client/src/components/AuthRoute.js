import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserInfo from "../utils/UserInfo";

export default function AuthRoute({ path, component, exact = false, role }) {
	const loggedIn = UserInfo.getLoggedIn();
	const rank = UserInfo.getRank();
	let msg = "";
	if (loggedIn) {
		if (role === undefined)
			return <Route path={path} component={component} exact={exact} />;

		if (role === rank)
			return <Route path={path} component={component} exact={exact} />;
		else {
			msg = "Insuficient rank";
		}
	} else {
		msg = "You need to login to access";
	}
	return <Redirect to={{ pathname: "/", state: { msg } }} />;
}
