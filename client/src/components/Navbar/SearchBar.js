import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router";
export default function SearchBar(props) {
	const history = useHistory();
	const [search, setSearch] = useState(props.value || "");
	//TODO Send it to search page (redux(?)/get)
	const submitHandler = (e) => {
		e.preventDefault();
		//TODO make link relevant
		const get = `${search}`;
		history.push(`/search/?search=${get}`);
	};
	return (
		//TODO change size
		<Form inline className="mr-sm-2" onSubmit={(e) => submitHandler(e)}>
			<FormControl
				type="text"
				placeholder="Search"
				className="mr-sm-2"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button type="submit" variant="outline-primary">
				Search
			</Button>
		</Form>
	);
}
