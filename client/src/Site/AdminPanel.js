import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import styles from "../styles/Profile.module.css";
import uniqid from "uniqid";
import axios from "axios";
import { toast } from "react-toastify";
export default function AdminPanel() {
	// TODO check if newForum is working correctly
	const [newForum, setNewForum] = useState("");
	const [userData, setUserData] = useState([]);
	const [categories, setCategories] = useState([]);
	const categoriesList = useRef();
	const tableBodyUsers = useRef();
	useEffect(() => {
		axios({ method: "get", url: "/api/forum" })
			.then((response) => {
				setCategories(response.data);
			})
			.catch((err) => console.error(err));

		axios({ method: "get", url: "/api/adminpanel " })
			.then((response) => {
				setUserData(response.data);
			})
			.catch((err) => console.error(err));
	}, []);
	const forumSubmitHandler = (e) => {
		e.preventDefault();
		axios({
			method: "POST",
			url: "/api/category/create",
			data: { categoryName: newForum },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
				} else {
					console.log(response.data);
					toast.error(response.data.msg);
				}
			})
			.catch((err) => console.error(err));
	};
	const makeModHandler = (id) => {
		axios({
			method: "put",
			url: "/api/adminpanel",
			data: { updatedId: id },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
				} else {
					console.log(response.data);
					toast.error(response.data.msg);
				}
			})
			.catch((err) => console.error(err));
	};
	const takeModHandler = (id) => {
		alert("No backend implentation found");
		axios({
			method: "get",
			url: "/api/adminpanel",
			data: { updatedId: id },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
				} else {
					console.log(response.data);
					toast.error(response.data.msg);
				}
			})
			.catch((err) => console.error(err));
	};
	const banHandler = (id) => {
		axios({
			method: "delete",
			url: "/api/adminpanel",
			data: { updatedId: id },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
				} else {
					console.log(response.data);
					toast.error(response.data.msg);
				}
			})
			.catch((err) => console.error(err));
	};

	categoriesList.current = categories.map((c) => (
		<li key={uniqid()}>{c.name}</li>
	));

	tableBodyUsers.current = userData.map((user) => (
		<tr key={uniqid()}>
			<td>{user.id}</td>
			<td>{user.nickName}</td>
			<td>
				{user.rank === 3 ? (
					<Button
						variant="success"
						onClick={() => makeModHandler(user.id)}
					>
						Make Mod
					</Button>
				) : (
					<Button
						variant="warning"
						onClick={() => takeModHandler(user.id)}
					>
						Take away Mod
					</Button>
				)}
				<Button
					variant="danger"
					className="ml-2"
					onClick={() => banHandler(user.id)}
				>
					Ban
				</Button>
			</td>
		</tr>
	));
	return (
		<Row className={styles.gutters_sm}>
			<Col md="4" className="mb-3">
				<Card className={styles.card}>
					<Card.Body className={styles.card_body}>
						<ul>{categoriesList.current}</ul>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
						<Card.Title>Create New Forum</Card.Title>
						<Form onSubmit={(e) => forumSubmitHandler(e)}>
							<Form.Control
								value={newForum}
								onChange={(e) => setNewForum(e.target.value)}
								placeholder="Name"
								className="mb-2"
							/>
							<Button type="submit">Create</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
			<Col md="8" className="mb-3">
				<Card>
					<Card.Body>
						<Card.Title>Users</Card.Title>
						<Table>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Options</th>
								</tr>
							</thead>
							<tbody>{tableBodyUsers.current}</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}
