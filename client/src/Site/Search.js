import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router";

export function Search() {
	const search = useLocation().search;
	const staticSearch = new URLSearchParams(search).get("search");
	const [searchValue, setSearchValue] = useState(staticSearch);
	const [searchResultView, setSearchResultView] = useState();
	useEffect(() => {
		axios({
			method: "GET",
			url: "/api/forum/search",
			params: { search: searchValue },
		})
			.then((result) => {
				//! renders 2 times, connects to db 1
				const dataView = result.data?.map((item) => (
					<div key={item.id}>{item.name}</div>
				));

				setSearchResultView(dataView);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setSearchValue(staticSearch);
			});
	}, [searchValue, staticSearch]);
	return (
		<>
			<Row>
				<Col>Testowy search: {searchValue}</Col>
			</Row>
			{searchResultView}
		</>
	);
}
