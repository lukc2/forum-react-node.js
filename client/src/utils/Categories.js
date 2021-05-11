const Categories = (function () {
	const getCategories = function () {
		return JSON.parse(localStorage.getItem("categories"));
	};
	const setCategories = function (newCategories) {
		localStorage.setItem("categories", JSON.stringify(newCategories));
	};

	return {
		getCategories: getCategories,
		setCategories: setCategories,
	};
})();

export default Categories;
