import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router";


const Login = ({history}) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [redirect,setRedirect] = useState(false);
	
	const auth= false;

	const submitHandler = async (e) => {
		e.preventDefault();
		
		try {
			const config = {
				headers: {"Content-type": "application/json"}
			}
			
			setLoading(true);
			
			const { data } = await axios.post(
				'http://127.0.0.1:1313/api/users/login',
				{	
					email,
					password
				},
				config
			);
			
			console.log(data);
			
			localStorage.setItem("userInfo", JSON.stringify(data));
			
			setError("");
			setLoading(false);
			setRedirect(true);
			

		} catch (error) {
			setLoading(false);
			setError(error.response.data);
		}
	}

	if (redirect) {
		return (<Redirect to="/" />)
	}

	return (
		<Form onSubmit={submitHandler}>
  			<Form.Group className="mb-3" controlId="formBasicEmail">
    			<Form.Label>Email address</Form.Label>
    			<Form.Control 
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter email" 
				/>
  			</Form.Group>

  			<Form.Group className="mb-3" controlId="formBasicPassword">
    			<Form.Label>Password</Form.Label>
    			<Form.Control 
					type="password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password" 
				/>
  			</Form.Group>
  			<Form.Group className="mb-3" controlId="formBasicCheckbox">
    			<Form.Check type="checkbox" label="Check me out" />
  			</Form.Group>
  			<Button variant="primary" type="submit">
    			Submit
  			</Button>
			{loading && <Loading />}
			{error && <Error>{error}</Error>}
		</Form>
	)
};

export default Login;