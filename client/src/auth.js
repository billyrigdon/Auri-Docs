import React from "react";

export const auth = () => {
	if (localStorage.getItem("userInfo")) {
		return true;
	} else {
		return false;
	}
};