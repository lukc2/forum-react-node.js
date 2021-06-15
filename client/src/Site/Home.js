import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";

export default function Home(props) {
	//Zastąpić przez pobranie z bazy
	const [categoriesJSON, setCategoriesJSON] = useState([
		// {
		// 	id: "1",
		// 	name: "Category 1",
		// 	link: "/category/1",
		// },
		// {
		// 	id: "2",
		// 	name: "Category 2",
		// 	link: "/category/2",
		// },
	]);
	const getCategory = async () => {
		axios({ method: "get", url: "/api/forum/" })
			.then((result) => {
				const data = result.data?.map((item) => {
					return {
						id: item.id,
						name: item.name,
						link: `/category/${item.id}`,
					};
				});
				setCategoriesJSON(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getCategory();
	}, []);

	if (props.history.location.state?.msg)
		toast.info(props.history.location.state.msg);

	//console.log(categoriesJSON);
	const categoriesList = categoriesJSON?.map((item) => {
		return (
			<div key={item.id} className=" mx-auto w-75">
				<Card>
					<Card.Body>
						<Card.Title>
							<Link to={item.link} style={{ color: "black" }}>
								<h3>{item.name}</h3>
							</Link>
						</Card.Title>
					</Card.Body>
				</Card>
			</div>
		);
	});
	return (
		<Container>
			<Row>
				<Col>Home page</Col>
			</Row>
			{categoriesList}
			{/* <ThreadList category={{name: "Last popular:"}} source={threads} /> */}
		</Container>
	);
}
