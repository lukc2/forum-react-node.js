import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router";

export function Search() {
	const search = useLocation().search;
	const staticSearch = new URLSearchParams(search).get("search");
	const [searchValue, setSearchValue] = useState(staticSearch);
	const [searchResult, setSearchResult] = useState();
	useEffect(() => {
		//TODO fix path, do mapping
		axios({
			method: "GET",
			url: "/api/search",
			params: { string: searchValue },
		})
			.then((result) => {
				const dataView = result.data?.map((item) => (
					<div key={item.id}>{item.name}</div>
				));
				setSearchResult(dataView);
			})
			.catch((error) => {
				console.log(error);
			});
		setSearchValue(staticSearch);
	}, [searchValue, staticSearch]);
	return (
		<>
			<Row>
				<Col>Testowy search: {searchValue}</Col>
			</Row>
			{searchResult}
		</>
	);
}
