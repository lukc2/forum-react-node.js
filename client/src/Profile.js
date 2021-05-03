import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import styles from "./styles/Profile.module.css";
import uniqid from "uniqid";
export default function Profile() {
	const [errors, setErrors] = useState([]);
	//TODO compare logged user to owner
	const disableInput = false;
	//TODO profile get to static data
	const staticData = {
		name: "Name",
		email: "Email@aaa.com",
		address: "Address",
		image: null,
	};
	const [profile, setProfile] = useState({ ...staticData, image: "" });
	const submitHandler = (e) => {
		e.preventDefault();
		if (disableInput) return;
		if (!window.confirm("Are you sure to commit this changes?")) return;
		alert("confirmed");
		//TODO Post changes
	};
	const imageHandler = (e) => {
		const newImage = e.target.files[0];
		if (newImage.size > 2048) {
			alert("File size to big");
			setProfile({ ...profile, image: "" });
			return;
		}
		setProfile({ ...profile, image: newImage });
	};
	useEffect(() => {
		//* validation
		let errors = [];
		if (profile.name.length < 4) {
			//TODO unitilize lengths for all validations
			errors.push("Name is too short");
		}
		if (profile.email.length < 5) {
			errors.push("Email is too short");
		}
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				profile.email
			)
		) {
			errors.push("Incorect email address");
		}
		if (profile.address.length < 5) {
			errors.push("Address is too short");
		}
		setErrors(errors);
	}, [profile]);

	const errMessages =
		errors.length !== 0 ? (
			<Card.Footer className="alert alert-danger">
				<ul>
					{errors.map((err) => (
						<li key={uniqid()}>{err}</li>
					))}
				</ul>
			</Card.Footer>
		) : null;
	return (
		<Row className={styles.gutters_sm}>
			<Col md="4" className="mb-3">
				<Card className={styles.card}>
					<Card.Body className={styles.card_body}>
						<div className="d-flex flex-column align-items-center text-center">
							<img
								className="rounded-circle"
								width="150"
								src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flokeshdhakar.com%2Fprojects%2Flightbox2%2Fimages%2Fimage-5.jpg&f=1&nofb=1"
								alt="Profile"
							/>
							<div className="mt-3">
								<h4>{staticData.name}</h4>
								<p className="text-secondary mb-1">
									{staticData.email}
								</p>
								<p className="text-muted font-size-sm">
									{staticData.address}
								</p>
								{/* <button className="btn btn-primary">
									Follow
								</button> */}
								<Form.File
									accept="image/*"
									custom
									label="Change Image"
									className="btn btn-outline-primary mw-100"
									value={profile.image}
									onChange={imageHandler}
									disabled={disableInput}
								/>
							</div>
						</div>
					</Card.Body>
				</Card>
				<Card className={styles.card + " mt-3"}>
					<ul className="list-group list-group-flush">
						<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
							<h6 className="mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-globe mr-2 icon-inline"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="2" y1="12" x2="22" y2="12"></line>
									<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
								</svg>
								Website
							</h6>
							<span className="text-secondary">
								https://bootdey.com
							</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
							<h6 className="mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-github mr-2 icon-inline"
								>
									<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
								</svg>
								Github
							</h6>
							<span className="text-secondary">bootdey</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
							<h6 className="mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-twitter mr-2 icon-inline text-info"
								>
									<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
								</svg>
								Twitter
							</h6>
							<span className="text-secondary">@bootdey</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
							<h6 className="mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-instagram mr-2 icon-inline text-danger"
								>
									<rect
										x="2"
										y="2"
										width="20"
										height="20"
										rx="5"
										ry="5"
									></rect>
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
									<line
										x1="17.5"
										y1="6.5"
										x2="17.51"
										y2="6.5"
									></line>
								</svg>
								Instagram
							</h6>
							<span className="text-secondary">bootdey</span>
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
							<h6 className="mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-facebook mr-2 icon-inline text-primary"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
								</svg>
								Facebook
							</h6>
							<span className="text-secondary">bootdey</span>
						</li>
					</ul>
				</Card>
			</Col>
			<Col md="8">
				<Form onSubmit={(e) => submitHandler(e)}>
					<Card className={styles.card + " mb-3"}>
						<Card.Body className={styles.card_body}>
							<Card.Title>Edit profile</Card.Title>
							<Row>
								<Col sm="3">
									<h6 className="mb-0">Full Name</h6>
								</Col>
								<Col sm="9" className="text-secondary pt-2">
									<Form.Control
										type="text"
										required
										value={profile.name}
										onChange={(e) =>
											setProfile({
												...profile,
												name: e.target.value,
											})
										}
										disabled={disableInput}
									/>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col sm="3">
									<h6 className="mb-0">Email</h6>
								</Col>
								<Col sm="9" className="text-secondary pt-2">
									<Form.Control
										type="email"
										required
										value={profile.email}
										onChange={(e) =>
											setProfile({
												...profile,
												email: e.target.value,
											})
										}
										disabled={disableInput}
									/>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col sm="3">
									<h6 className="mb-0">Address</h6>
								</Col>
								<Col sm="9" className="text-secondary pt-2">
									<Form.Control
										type="text"
										required
										value={profile.address}
										onChange={(e) =>
											setProfile({
												...profile,
												address: e.target.value,
											})
										}
										disabled={disableInput}
									/>
								</Col>
							</Row>
						</Card.Body>
						{errMessages}
						<Button type="submit" disabled={disableInput}>
							Save
						</Button>
					</Card>
				</Form>
				<Row>
					<Col sm="6" mb="3">
						<Card className={styles.card}>
							<Card.Body className={styles.card_body}>
								<h6 className="d-flex align-items-center mb-3">
									<i className="material-icons text-info mr-2">
										assignment
									</i>
									Project Status
								</h6>
								<small>Web Design</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "80%" }}
										aria-valuenow="80"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Website Markup</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "72%" }}
										aria-valuenow="72"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>One Page</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "89%" }}
										aria-valuenow="89"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Mobile Template</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "55%" }}
										aria-valuenow="55"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Backend API</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "66%" }}
										aria-valuenow="66"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col sm="6" mb="3">
						<Card className={styles.card}>
							<Card.Body className={styles.card_body}>
								<h6 className="d-flex align-items-center mb-3">
									<i className="material-icons text-info mr-2">
										assignment
									</i>
									Project Status
								</h6>
								<small>Web Design</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "80%" }}
										aria-valuenow="80"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Website Markup</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "72%" }}
										aria-valuenow="72"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>One Page</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "89%" }}
										aria-valuenow="89"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Mobile Template</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "55%" }}
										aria-valuenow="55"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<small>Backend API</small>
								<div
									className="progress mb-3"
									style={{ height: "5px" }}
								>
									<div
										className="progress-bar bg-primary"
										role="progressbar"
										style={{ width: "66%" }}
										aria-valuenow="66"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}
