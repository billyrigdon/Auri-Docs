import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Redirect } from "react-router";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const config = {
				headers: { "Content-type": "application/json" },
			};

			setLoading(true);

			const { data } = await axios.post(
				"http://45.33.126.222:1944/api/users/login",
				{
					email,
					password,
				},
				config
			);

			console.log(data);

			localStorage.setItem("userInfo", JSON.stringify(data));
			localStorage.setItem("email", JSON.stringify(data.email));
			localStorage.setItem("token", JSON.stringify(data.token));

			setError("");
			setLoading(false);
			setRedirect(true);
		} catch (error) {
			setLoading(false);
			setError(error.response.data);
		}
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div id="login-container">
			<div id="login-card">
				<Form className="login-form" onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label className="login-label">
							Email address
						</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label className="login-label">
							Password
						</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</Form.Group>
					<Button
						id="save-app-button"
						variant="primary"
						type="submit"
					>
						Submit
					</Button>
					{loading && <Loading />}
					{error && <Error>{error}</Error>}
				</Form>
			</div>
		</div>
	);
};

export default Login;
