const Categories = (function () {
	const getCattegories = function () {
		return JSON.parse(localStorage.getItem("categories"));
	};
	const setCattegories = function (newCategories) {
		localStorage.setItem("categories", JSON.stringify(newCategories));
	};

	return {
		getCattegories: getCattegories,
		setCattegories: setCattegories,
	};
})();

export default Categories;
