//import '../styles/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import Login from "../Screens/Login";
import {PrivateRoute} from "./PrivateRoute";
import Auri from "../Screens/Auri"



//Render App component
const App = () => {

	const [userInfo,setUserInfo] = useState("");
	console.log(userInfo);
	
	useEffect(()=> {
		setUserInfo(localStorage.getItem("userInfo"));
	},[]);
	
	return (
		<Router>
			<PrivateRoute exact path="/" component={Auri} />
			<Route path="/login">
				{userInfo ? <Redirect to="/" /> : <Login />}
			</Route>	
		</Router>
	);
}

export default App;
