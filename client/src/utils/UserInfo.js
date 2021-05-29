const UserInfo = (function () {
	let loggedIn = null;
	let id = null;
	let nickname = "";
	let rank = null;

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
		if (rank) return rank;
		rank = sessionStorage.getItem("rank");
		return rank;
	};
	const setRank = (newRank) => {
		rank = newRank;
		sessionStorage.setItem("rank", rank);
	};
	const setId = (newId) => {
		id = newId;
		sessionStorage.setItem("id", id);
	};
	const getId = () => {
		if (id) return id;
		id = sessionStorage.getItem("id");
		return id;
	};
	const destroy = function () {
		nickname = "";
		loggedIn = null;
		rank = null;
		id = null;
		sessionStorage.clear();
	};

	return {
		setNickname,
		getNickname,
		setLoggedIn,
		getLoggedIn,
		getRank,
		setRank,
		setId,
		getId,
		destroy,
	};
})();

export default UserInfo;
