import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ThreadList from "./../components/View/ThreadList";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home(props) {
	//Zastąpić przez pobranie z bazy
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
	if (props.history.location.state?.msg)
		toast.info(props.history.location.state.msg);

	const [threads] = useState([
		{
			id: 1,
			name: "Hello everyone",
			category_id: 1,
			reputation: 14,
			voted: [],
			created_at: Date.now(),
			updated_at: Date.now(),
			closed: true,
			user_id: 1,
		},
		{
			id: 2,
			name: "Where do I find this?",
			category_id: 1,
			reputation: 23,
			voted: [],
			created_at: Date.now(),
			closed: false,
			user_id: 1,
		},
		{
			id: 3,
			name: "Why is it so?",
			category_id: 1,
			reputation: 3131,
			voted: [],
			created_at: Date.now(),
			closed: false,
			user_id: 1,
		},
	]);

	const categoriesList = categoriesJSON.map((item) => {
		return (
			<Row key={item.id}>
				<Link to={item.link}>
					<Col>{item.id}</Col>
					<Col>{item.name}</Col>
				</Link>
			</Row>
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
