import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import styles from "../styles/Profile.module.css";
import UserInfo from "../utils/UserInfo";
import uniqid from "uniqid";
import axios from "axios";
import { toast } from "react-toastify";
export default function AdminPanel() {
	const [newForum, setNewForum] = useState("");
	const [usersData, setUsersData] = useState([]);
	const [categories, setCategories] = useState([]);
	const categoriesList = useRef();
	const tableBodyUsers = useRef();
	const [gfyjifgy, setGfyjifgy] = useState(false);

	const refresh = () => {
		setGfyjifgy(!gfyjifgy);
	};
	useEffect(() => {
		axios({ method: "get", url: "/api/forum" })
			.then((response) => {
				setCategories(response.data);
			})
			.catch((err) => console.error(err));

		axios({ method: "get", url: "/api/adminpanel " })
			.then((response) => {
				setUsersData(response.data);
			})
			.catch((err) => console.error(err));
	}, [gfyjifgy]);
	const forumSubmitHandler = (e) => {
		e.preventDefault();
		axios({
			method: "POST",
			url: "/api/adminpanel",
			data: { categoryName: newForum },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
					refresh();
				} else {
					console.log(response.data);
					response.data?.errors?.errors?.map((err) =>
						toast.error(err.message)
					);
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
					refresh();
				} else {
					console.log(response.data);
					toast.error(response.data.msg);
				}
			})
			.catch((err) => console.error(err));
	};
	const takeModHandler = (id) => {
		// TODO
		axios({
			method: "put",
			url: "api/adminpanel/takemod",
			data: { updatedId: id },
		})
			.then((response) => {
				if (response.data.success) {
					toast.success(response.data.msg);
					refresh();
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
					refresh();
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
	const userId = parseInt(UserInfo.getId());
	tableBodyUsers.current = usersData.map((user) => (
		<tr key={uniqid()}>
			<td>{user.id}</td>
			<td>
				{userId === user.id ? (
					<span className="badge badge-success">You</span>
				) : null}{" "}
				{user.rank_id !== 3 ? (
					<span className="badge badge-primary">Mod</span>
				) : null}{" "}
				{user.deleted ? (
					<span className="badge badge-danger">BANNED</span>
				) : null}{" "}
			</td>
			<td>{user.nickname}</td>
			<td>
				{user.rank_id === 3 ? (
					<Button
						variant="success"
						onClick={() => makeModHandler(user.id)}
						disabled={userId === user.id}
					>
						Make Mod
					</Button>
				) : (
					<Button
						variant="warning"
						onClick={() => takeModHandler(user.id)}
						disabled={userId === user.id}
					>
						Take away Mod
					</Button>
				)}
				<Button
					variant="danger"
					className="ml-2"
					onClick={() => banHandler(user.id)}
					disabled={userId === user.id}
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
				<Card className="mt-1">
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
									<th>Badges</th>
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
