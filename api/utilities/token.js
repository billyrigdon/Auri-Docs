const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "7d"});
};

const verifyToken = (token) => {
	const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
	return verifiedToken;
}

module.exports = {generateToken, verifyToken};