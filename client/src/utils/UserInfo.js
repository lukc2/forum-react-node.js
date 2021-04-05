const UserInfo = (function () {
	let nickname = "";
	let loggedIn = null;
	const getNickname = function () {
		if (nickname) return nickname;
		nickname = sessionStorage.getItem("nickname") || false;
		return nickname;
	};

	const setNickname = function (newNickname) {
		nickname = newNickname;
		sessionStorage.setItem("nickname", nickname);
	};
	const getLoggedIn = function () {
		if (loggedIn) return loggedIn;
		loggedIn = sessionStorage.getItem("loggedIn") || false;
		return loggedIn;
	};

	const setLoggedIn = function (loggedInBool) {
		loggedIn = loggedInBool;
		sessionStorage.setItem("loggedIn", loggedInBool);
	};
	const destroy = function () {
		nickname = "";
		loggedIn = null;
		sessionStorage.clear();
	};

	return {
		setNickname: setNickname,
		getNickname: getNickname,
		setLoggedIn: setLoggedIn,
		getLoggedIn: getLoggedIn,
		destroy: destroy,
	};
})();

export default UserInfo;
