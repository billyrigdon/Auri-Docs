import React from "react";
import { Redirect, Route } from "react-router-dom";

const auth = () => {
	if (localStorage.getItem("userInfo")) {
		return true;
	} else {
		return false;
	}
};

export const PrivateRoute = ({component: Component, ...rest}) => {
	return (
		<Route {...rest} render={
			(props) => {
				if (auth()) {
					return <Component {...props} />
				} else {
					return <Redirect to={
						{
							pathname: "/login",
							state: {
								from: props.location
							}
						}
					} />
				}
			}
		}/>
	)
}

