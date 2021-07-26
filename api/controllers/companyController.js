const Companies = require("../models/companyModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {verifyToken} = require("../utilities/token");

/* Couldn't get it to work but maybe it just needs to be exported? will try later
const decodeUser = asyncHandler(async (userToken,userEmail) => {
	const user = await User.findOne({email: JSON.parse(userEmail)});
	const token = JSON.parse(userToken);
	decodedUser = verifyToken(token);

	if (decodedUser.id === user._id.toString()) {
		console.log(decodedUser.id);
		console.log(user._id.toString());
		return true
	} else {
		return false;
	}
})
*/

const getCompany = asyncHandler(async (req,res) => {

	const user = await User.findOne({email: JSON.parse(req.body.email)});
	const token = JSON.parse(req.body.token);
	decodedUser = verifyToken(token);

	if (decodedUser.id === user._id.toString()) {
		Companies.findOne({name: req.body.company}, (err, companyFound) => {
			if (err) return console.log(err);
			console.log(companyFound);
			res.json(companyFound);
		});
	} else {
		res.status(400).send("Not authenticated")
	}
});

const getAllCompanies = asyncHandler(async (req,res) => {

	const user = await User.findOne({email: JSON.parse(req.body.email)});
	const token = JSON.parse(req.body.token);
	decodedUser = verifyToken(token);

	if (decodedUser.id === user._id.toString()) {
		Companies.find({}, (err, allCompany) => {
			if (err) return console.log(err);
			console.log("authed")
			res.status(200).json(allCompany);
		})
	} else {
		console.log("not auth")
		res.status(400).send("Not authenticated");
	}
})



module.exports = { getCompany, getAllCompanies };