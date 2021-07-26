const Companies = require("../models/companyModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {verifyToken} = require("../utilities/token");

const decodeUser = (userToken,userEmail) => {
	const user = await User.findOne({email: JSON.parse(userEmail)});
	const token = JSON.parse(userToken);
	decodedUser = verifyToken(token);

	return decodedUser === user._id.toString();
}

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

	if (decodeUser(req.body.token,req.body.email)) {
		Companies.find({}, (err, allCompany) => {
			if (err) return console.log(err);
			res.status(200).json(allCompany);
		})
	} else {
		res.status(400).send("Not authenticated");
	}
})



module.exports = { getCompany, getAllCompanies };