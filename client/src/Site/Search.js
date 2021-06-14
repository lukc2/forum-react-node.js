import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import Thread from "../components/View/Thread";

export function Search() {
	const search = useLocation().search;
	const staticSearch = new URLSearchParams(search).get("search");
	const [searchValue, setSearchValue] = useState(staticSearch);
	const [searchResult, setSearchResult] = useState();
	useEffect(() => {
		axios({
			method: "GET",
			url: "/api/forum/search",
			params: { search: searchValue },
		})
			.then((result) => {
				//! renders 2 times, connects to db 1
				setSearchResult(result.data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setSearchValue(staticSearch);
			});
	}, [searchValue, staticSearch]);
	const threadList = searchResult?.map((thread) => {
		return (
			<Thread
				key={thread.id}
				thread={thread}
				category={{ id: thread.category_id }}
			/>
		);
	});
	return (
		<>
			<Row>
				<Col>
					<h2>Testowy search: {searchValue}</h2>
				</Col>
			</Row>
			{threadList}
		</>
	);
}
