const UserInfo = (function () {
	let nickname = "";
	let loggedIn = null;
	let rank = 0;
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
	const getRank = () => {
		return rank;
	};
	const setRank = (newRank) => {
		rank = newRank;
	};
	const destroy = function () {
		nickname = "";
		loggedIn = null;
		rank = null;
		sessionStorage.clear();
	};

	return {
		setNickname,
		getNickname,
		setLoggedIn,
		getLoggedIn,
		getRank,
		setRank,
		destroy,
	};
})();

export default UserInfo;
