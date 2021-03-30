const UserInfo = (function () {
	let nickname = "";
	let loggedIn = false;
	const getNickname = function () {
		return nickname; // Or pull this from cookie/localStorage
	};

	const setNickname = function (newNickname) {
		nickname = newNickname;
		// Also set this in cookie/localStorage
	};
	const getLoggedIn = function () {
		return loggedIn; // Or pull this from cookie/localStorage
	};

	const setLoggedIn = function (loggedInBool) {
		loggedIn = loggedInBool;
		// Also set this in cookie/localStorage
	};

	return {
		setNickname: setNickname,
		getNickname: getNickname,
		setLoggedIn: setLoggedIn,
		getLoggedIn: getLoggedIn,
	};
})();

export default UserInfo;
