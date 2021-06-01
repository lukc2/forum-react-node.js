import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Category from "./Site/Category";
import Profile from "./Site/Profile";
import OurNavbar from "./components/Navbar/Navbar";
import Home from "./Site/Home";
import { Search } from "./Site/Search";
import AdminPanel from "./Site/AdminPanel";
import AuthRoute from "./components/AuthRoute";
// import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<OurNavbar />
			<Container fluid>
				<Switch>
					<Route path="/search/" component={Search} />
					<Route path="/category/:id" component={Category} />
					<AuthRoute path="/profile" component={Profile} />
					<AuthRoute path="/admin" component={AdminPanel} />
					<Route path="/" exact component={Home} />
					<Route component={Home} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;