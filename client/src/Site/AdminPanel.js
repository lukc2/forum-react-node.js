import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import styles from "../styles/Profile.module.css";
import uniqid from "uniqid";
export default function AdminPanel() {
	// TODO check if newForum is working correctly
	const [newForum, setNewForum] = useState("");
	const [userData, setUserData] = useState(); //TODO find use for it?
	const categoriesList = useRef();
	const tableBodyUsers = useRef();
	useEffect(() => {
		// TODO axios get categories
		const categories = [{ id: 1, name: "Category 1" }];
		categoriesList.current = categories.map((c) => (
			<li key={uniqid()}>{c.name}</li>
		));

		// TODO axios get users
		const users = [{ id: 1, nickName: "test", rank: 4 }];
		tableBodyUsers.current = users.map((user) => (
			<tr key={uniqid()}>
				<td>{user.id}</td>
				<td>{user.nickName}</td>
				<td>
					{user.rank === 4 ? (
						<Button variant="success">Make Mod</Button>
					) : (
						<Button variant="warning">Take away Mod</Button>
					)}
					<Button variant="danger" className="ml-2">
						Ban
					</Button>
				</td>
			</tr>
		));
		setUserData(users);
	}, []);
	const forumSubmitHandler = (e) => {
		e.preventDefault();
		axios({
			method: "POST",
			url: "/api/category/create",
			data: { ...newForum },
		});
	};
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
