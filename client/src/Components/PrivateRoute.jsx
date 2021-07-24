import React from "react";
import { Redirect, Route } from "react-router-dom";
import {auth} from "../auth"

auth();

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

