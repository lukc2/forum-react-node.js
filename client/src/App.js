import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Category from "./Category";
import Profile from "./Profile";
import OurNavbar from "./components/Navbar/Navbar";
import Home from "./Home";
import { Search } from "./Search";
// import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<OurNavbar />
			<Container fluid>
				<Route path="/search/" component={Search}/>
				<Route path="/category/:id" component={Category} />
				<Route path="/profile" component={Profile} />
				<Route path="/" exact component={Home} />
			</Container>
		</BrowserRouter>
	);
}

export default App;
