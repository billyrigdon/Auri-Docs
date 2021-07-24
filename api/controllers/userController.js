const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utilities/token");


const createUser = asyncHandler(async (req,res) => {
	const {email, password} = req.body;
	
	const emailExists = await User.findOne({email});
	const usernameExists = await User.findOne({username});

	if(emailExists) {
		res.status(400).send("There is an account already associated with this email")
		throw new Error("There is an account already associated with this email")
	} else if (usernameExists) {
		res.status(400).send("Username already in use")
	}

	const user = await User.create({
		username,
		email,
		password,
		profilePic
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else {
		res.status(400).send("Unable to create user");
		throw new Error("Unable to Create User");
	}
});

const loginUser = asyncHandler(async (req,res) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});

	if (user && (await user.matchPassword(password))) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else {
		res.status(400).send("Invalid login credentials")
		throw new Error("Invalid login credentials");
	}
});

module.exports = {createUser, loginUser};