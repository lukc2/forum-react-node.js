import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Category({ match }) {
	return (
		<Row>
			<Col>Category {match.params.id}</Col>
		</Row>
	);
}
