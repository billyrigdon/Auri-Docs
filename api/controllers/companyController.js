const Companies = require("../models/companyModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {verifyToken} = require("../utilities/token");


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
		res.send("Not authenticated")
	}
});



module.exports = {getCompany};