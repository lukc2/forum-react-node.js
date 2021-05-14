import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import SearchBar from "../components/Navbar/SearchBar";

export function Search() {
	const search = useLocation().search;
	const staticSearch = new URLSearchParams(search).get("search");
	const [searchValue, setSearchValue] = useState(staticSearch);
	useEffect(() => {
		//TODO Download data
		setSearchValue(staticSearch);
	}, [searchValue, staticSearch]);
	return (
		<div>
			<Row>
				<Col>
					<SearchBar value={searchValue} setValue={setSearchValue} />
				</Col>
			</Row>
			<Row>
				<Col>Testowy search: {searchValue}</Col>
			</Row>
		</div>
	);
}
