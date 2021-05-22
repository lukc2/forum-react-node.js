import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router";
export default function SearchBar({ value, setValue }) {
	const history = useHistory();
	const [search, setSearch] = useState(value || "");
	const submitHandler = (e) => {
		e.preventDefault();
		if (!search) {
			alert("Please enter search phrase");
			return;
		}
		const get = new URLSearchParams("");
		get.set("search", search);
		history.push(`/search?${get.toString()}`);
		console.log(value);
		if (value) setValue(search);
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
