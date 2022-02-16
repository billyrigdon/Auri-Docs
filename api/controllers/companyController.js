const Companies = require("../models/companyModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../utilities/token");

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

//Company CRUD Functions
const createCompany = (companyName) => {
	Companies.create(
		{
			name: companyName,
			address: "",
			emailAddr: "",
			phone: "",
			articles: [],
			apps: [],
			backups: {
				offsiteTechnology: "",
				offsiteWindow: "",
				offsiteFrequency: "",
				offsiteDescription: "",
				offsiteLocation: "",
				localTechnology: "",
				localWindow: "",
				localFrequency: "",
				localDescription: "",
				localLocation: "",
			},
			email: {
				platform: "",
				webmail: "",
				server: "",
				domains: "",
			},
			fileShares: {
				server: "",
				rootPath: "",
				onPrem: false,
				driveLetters: "",
			},
			networks: {
				dns: "",
				ddns: "",
				subnet: "",
				public: "",
				gateway: "",
				domainController: "",
				dhcpServer: "",
				dhcpScope: "",
				router: {
					subnet: "",
					ipAddr: "",
					dhcp: false,
					portForwards: "",
					notes: "",
					vpn: "",
				},
				wireless: {
					ssid: "",
					encryption: "",
					mgmtURL: "",
				},
				vpn: {
					vpnType: "",
					pskLocation: "",
					publicIP: "",
					vpnClient: "",
				},
			},
			servers: [],
		},
		(err, company) => {
			if (err) return console.log(err);
			console.log("Created new company: " + company.name);
		}
	);
};

const getCompany = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: JSON.parse(req.body.email) });
	const token = JSON.parse(req.body.token);
	decodedUser = verifyToken(token);

	if (decodedUser.id === user._id.toString()) {
		Companies.findOne({ name: req.body.company }, (err, companyFound) => {
			if (err) return console.log(err);
			console.log(companyFound);
			res.json(companyFound);
		});
	} else {
		res.status(400).send("Not authenticated");
	}
});

const getAllCompanies = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: JSON.parse(req.body.email) });
	const token = JSON.parse(req.body.token);
	decodedUser = verifyToken(token);

	if (decodedUser.id === user._id.toString()) {
		Companies.find({}, (err, allCompany) => {
			if (err) return console.log(err);
			console.log("authed");
			res.status(200).json(allCompany);
		});
	} else {
		console.log("not auth");
		res.status(400).send("Not authenticated");
	}
});

//TODO - This is not how this logic should be at all
const updateCompany = asyncHandler(
	async (companyName, objToUpdate, newValue, done) => {
		await Companies.findOne({ name: companyName }, (err, company) => {
			if (err) return console.log(err);
			company[objToUpdate] = newValue;
			company.save((err, updatedCompany) => {
				if (err) return console.log(err);
				done(null, updatedCompany);
			});
		});
	}
);

const deleteCompany = (companyName, done) => {
	Companies.findOneAndRemove({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		done(null, company);
	});
};

//Article CRUD functions
const createArticle = (companyName, articleTitle, articleContent, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		company.articles.push({ title: articleTitle, content: articleContent });
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

//Applications CRUD functions
const createApp = (companyName, appObj, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		company.apps.push(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

const deleteApp = (companyName, appObj, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		company.apps.pull(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

const updateApp = (companyName, oldApp, newApp, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		appIndex = company.apps.findIndex((x) => x.name === oldApp.name);
		if (appIndex < 0) {
			createApp(companyName, newApp, console.log);
		} else {
			company.apps.set(appIndex, newApp);
			company.save((err, updatedCompany) => {
				if (err) return console.log(err);
				done(null, updatedCompany);
			});
		}
	});
};

//Server Functions

const createServer = (companyName, serverObj, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		company.servers.push(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

const deleteServer = (companyName, serverObj, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		company.servers.pull(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

const updateServer = (companyName, oldServer, newServer, done) => {
	Companies.findOne({ name: companyName }, (err, company) => {
		if (err) return console.log(err);
		serverIndex = company.servers.findIndex(
			(x) => x.hostname === oldServer.hostname
		);
		if (serverIndex < 0) {
			createServer(companyName, newServer, console.log);
		} else {
			company.servers.set(serverIndex, newServer);
			company.save((err, updatedCompany) => {
				if (err) return console.log(err);
				done(null, updatedCompany);
			});
		}
	});
};

module.exports = {
	getCompany,
	getAllCompanies,
	updateCompany,
	deleteCompany,
	createCompany,
	createArticle,
	createApp,
	deleteApp,
	updateApp,
	createServer,
	deleteServer,
	updateServer,
};
