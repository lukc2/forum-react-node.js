import { Col, Row } from "react-bootstrap";
import SearchBar from "../components/Navbar/SearchBar";

export function Search() {
	const getValue = "TEST";
	return (
		<div>
			<Row>
				<Col>
					<SearchBar value={getValue} />
				</Col>
			</Row>
			<Row>
				<Col>Testowy search: {getValue}</Col>
			</Row>
		</div>
	);
}
