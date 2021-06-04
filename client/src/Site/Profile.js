import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import styles from "../styles/Profile.module.css";
import uniqid from "uniqid";
import Password from "../components/Password";
import UserInfo from "../utils/UserInfo";
import {
	faChartLine,
	faLock,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
	const [errors, setErrors] = useState([]);
	const [image, setImage] = useState("");
	const [password, setPassword] = useState("");
	const [passwordValid, setPasswordValid] = useState(false);
	const [disableSubmit, setDisableSubmit] = useState(false);
	const disableInput = useRef(true);
	const history = useHistory();
	const fileToDataUri = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.readAsDataURL(file);
		});

	let staticData = useRef({
		name: "",
		email: "",
		birthDate: dateFormat(new Date(), "yyyy-mm-dd"),
		image: "",
		footer: "",

		reputation: 20,
		postCount: 10,
		joinDate: new Date(),
	});
	const [profile, setProfile] = useState({ ...staticData.current });
	let firstLoad = useRef(true);
	//! DB related
	const getData = async () => {
		axios({ method: "get", url: "api/userpanel" })
			.then((result) => {
				const data = {
					name: result.data.nickname,
					email: result.data.email,
					birthDate: dateFormat(
						result.data.date_of_birth,
						"yyyy-mm-dd"
					),
					image: result.data.avatar,
					footer: result.data.footer || "",
					reputation: result.data.reputationCount,
					postCount: result.data.postCount,
					joinDate: result.data.joinDate,
				};
				staticData.current = data;
				firstLoad.current = false;
				disableInput.current = false;
				setProfile({ ...data });
				setImage(data.image);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getData();
	}, []);
	const submitHandler = (e) => {
		e.preventDefault();
		if (disableInput.current) return;
		if (!window.confirm("Are you sure to commit this changes?")) return;
		if (
			staticData.current.name.localeCompare(profile.name) === 0 &&
			staticData.current.email.localeCompare(profile.email) === 0 &&
			staticData.current.birthDate.localeCompare(profile.birthDate) === 0
		) {
			return;
		}
		axios({
			method: "POST",
			url: "/api/userpanel",
			data: {
				nickname: profile.name,
				email: profile.email,
				date: profile.birthDate,
			},
		})
			.then((response) => {
				if (response.data.success) toast.success(response.data.msg);
				else toast.error(response.data.msg);
				getData();
			})
			.catch((err) => console.error(err));
	};
	const imageHandler = (e) => {
		const file = e.target.files[0];
		if (!file) {
			setImage("");
			return;
		}
		fileToDataUri(file).then((dataUri) => {
			setImage(dataUri);
		});
	};
	const imageUpdateHandler = () => {
		if (image.localeCompare("") === 0) return;
		axios({
			method: "post",
			url: "/api/userpanel/avatar ",
			data: { avatar: image },
		})
			.then((response) => {
				if (response.data.success) toast.success(response.data.msg);
				else toast.error(response.data.msg);
				getData();
			})
			.catch((err) => console.error(err));
	};
	const passwordHandler = () => {
		axios({ method: "put", url: "/api/userpanel", data: { password } })
			.then((response) => {
				if (response.data.success) toast.success(response.data.msg);
				else toast.error(response.data.msg);
				getData();
			})
			.catch((err) => console.error(err));
		setPassword("");
	};
	const footerHandler = () => {
		axios({
			method: "patch",
			url: "/api/userpanel",
			data: { footer: profile.footer },
		})
			.then((response) => {
				if (response.data.success) toast.success(response.data.msg);
				else toast.error(response.data.msg);
				getData();
			})
			.catch((err) => console.error(err));
	};
	const deleteHandler = () => {
		if (!window.confirm("Are you sure you want to delete this account"))
			return;
		axios({ method: "delete", url: "/api/userpanel " })
			.then((response) => {
				if (response.data.success) {
					UserInfo.destroy();
					history.push("/", { msg: "Account deleted" });
				} else {
					console.log(response.data);
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		//* validation
		let errors = [];
		let disable = false;
		if ((profile.name?.length || 0) < 4) {
			errors.push("Name is too short");
		}
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				profile.email
			)
		) {
			errors.push("Incorect email address");
		}
		if (!firstLoad.current) setErrors(errors);
		if (errors.length > 0) disable = true;
		setDisableSubmit(disable);
		// TODO validation of birth date
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
								src={image}
								alt="Profile"
							/>
							<div className="mt-3">
								<h4>{staticData.current.name}</h4>
								<p className="text-secondary mb-1">
									{staticData.current.email}
								</p>
								<p className="text-muted font-size-sm">
									{dateFormat(
										staticData.current.birthDate,
										"dd-mm-yyyy"
									)}
								</p>
								<Form.File
									accept="image/*"
									custom
									label="Change Image"
									className=" mw-100"
									onChange={imageHandler}
									disabled={disableInput.current}
								/>
								<Button
									variant="success"
									className="mt-2"
									onClick={imageUpdateHandler}
									disabled={disableInput.current}
								>
									Update
								</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
				<Row className=" mt-3 mb-2">
					<Col>
						<Card>
							<Card.Body>
								<Button
									variant="danger"
									onClick={deleteHandler}
									disabled={disableInput.current}
								>
									Delete account
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Col>
			<Col md="8">
				<Form onSubmit={(e) => submitHandler(e)}>
					<Card className={styles.card + " mb-3"}>
						<Card.Body className={styles.card_body}>
							<Card.Title>
								<FontAwesomeIcon icon={faUserCircle} />
								Edit profile
							</Card.Title>
							<Row>
								<Col sm="3">
									<h6 className="mb-0">Nickname</h6>
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
										disabled={disableInput.current}
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
										disabled={disableInput.current}
									/>
								</Col>
							</Row>
							<hr />
							<Row>
								<Col sm="3">
									<h6 className="mb-0">Birth Date</h6>
								</Col>
								<Col sm="9" className="text-secondary pt-2">
									<Form.Control
										type="date"
										required
										value={profile.birthDate}
										onChange={(e) =>
											setProfile({
												...profile,
												birthDate: e.target.value,
											})
										}
										disabled={disableInput.current}
									/>
								</Col>
							</Row>
						</Card.Body>
						{errMessages}
						<Button
							type="submit"
							disabled={disableInput.current || disableSubmit}
						>
							Save
						</Button>
					</Card>
				</Form>
				<Row>
					<Col sm="6" mb="3">
						<Card className={styles.card}>
							<Card.Body className={styles.card_body}>
								<h6 className="d-flex align-items-center mb-3">
									<FontAwesomeIcon icon={faLock} />
									Change password
								</h6>
								<Password
									password={password}
									setPassword={setPassword}
									valid={setPasswordValid}
									disabled={disableInput.current}
								/>
								<Button
									onClick={passwordHandler}
									disabled={
										!passwordValid || disableInput.current
									}
								>
									Change Password
								</Button>
							</Card.Body>
						</Card>
					</Col>
					<Col sm="6" mb="3">
						<Card
							className={styles.card}
							style={{ fontSize: "1.5em" }}
						>
							<Card.Body className={styles.card_body}>
								<h6 className="d-flex align-items-center mb-3">
									<FontAwesomeIcon icon={faChartLine} />
									Stats
								</h6>
								<Row>
									<Col>
										<span className="font-weight-bold">
											{profile.reputation || 0}
										</span>
										<br />
										<small>Reputation</small>
									</Col>
									<Col>
										<span className="font-weight-bold">
											{profile.postCount}
										</span>
										<br />
										<small>Posts</small>
									</Col>
								</Row>
								<hr />
								<Row className="mt-2">
									<Col>
										<span className="font-weight-bold">
											{dateFormat(
												profile.joinDate,
												"dd-mm-yyyy"
											)}
										</span>
										<br />
										<small>Joined</small>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Card>
							<Card.Header>Your Footer</Card.Header>
							<Card.Body>
								<Card.Title>Old</Card.Title>
								<Form.Control
									as="textarea"
									value={staticData.current.footer}
									disabled={true}
								/>
								<Card.Title className="mt-1">New</Card.Title>
								<Form.Control
									as="textarea"
									value={profile.footer}
									onChange={(e) =>
										setProfile({
											...profile,
											footer: e.target.value,
										})
									}
									disabled={disableInput.current}
								/>
								<Button
									className="mt-3"
									onClick={footerHandler}
									disabled={disableInput.current}
								>
									Update footer
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}
