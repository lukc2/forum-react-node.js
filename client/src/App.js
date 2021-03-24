import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Category from "./Category";
import Profile from "./Profile";
import OurNavbar from "./components/Navbar";
import Home from "./Home";
// import "./App.css";

function App() {
	return (
		<Container fluid>
			<BrowserRouter>
				<Row>
					<Col>
						<OurNavbar />
					</Col>
				</Row>

				<Route path="/category" component={Category} />
				<Route path="/profil" component={Profile} />
				<Route path="/" exact component={Home} />
			</BrowserRouter>
		</Container>
	);
}

export default App;
