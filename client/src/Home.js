import React from "react";
import { Col, Row } from "react-bootstrap";
import Categories from "./utils/Categories";
export default function Home() {
	const categoriesJSON = [
		{
			id: "1",
			name: "Category 1",
			link: "/category/1",
		},
		{
			id: "2",
			name: "Category 2",
			link: "/category/2",
		},
	];

	React.useEffect(() => {
		//TODO fetch the categories and force update

		Categories.setCattegories(categoriesJSON); //przykładowe użycie zmiennych
	}, []);
	return (
		<Row>
			<Col>Home page</Col>
		</Row>
	);
}
