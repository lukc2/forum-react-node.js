import React,{useState} from "react"
import {Form,Button,FormControl} from 'react-bootstrap'
export default function SearchBar() {
	const [search,setSearch]=useState("")
    //TODO Send it to search page (redux(?)/get)
	const submitHandler=()=>{

	}
    return (<Form inline className="mr-sm-2" onSubmit={submitHandler}>
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
						value={search}
						onChange={(e)=>setSearch(e.target.value)}
					/>
					<Button variant="outline-primary">Search</Button>
				</Form>)
}
