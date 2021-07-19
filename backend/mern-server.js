//Dependencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("mongodb");
require("dotenv").config();

//Global Variables
const port = process.env.PORT


//Mongoose Schema and functions to CRUD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const companySchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: {type: String, default:""},
	emailAddr: String,
	phone: String,
	articles: [],
	apps: [],
	backups: {
		offsiteTechnology: String,
		offsiteWindow: String,
		offsiteFrequency: String,
		offsiteDescription: String,
		offsiteLocation: String,
		localTechnology: String,
		localWindow: String,
		localFrequency: String,
		localDescription: String,
		localLocation: String
	},
	email: {
		platform: String,
		webmail: String,
		server: String,
		domains: String
	},
	fileShares: {
		server: String,
		rootPath: String,
		onPrem: Boolean,
		driveLetters: String
	},
	networks: {
		dns: String,
		ddns: String,
		subnet: String,
		public: String,
		gateway: String,
		domainController: String,
		dhcpServer: String,
		dhcpScope: String,
		router: {
			subnet:String, 
			ipAddr:String,
			dhcp: Boolean,
			portForwards: String,
			notes: String, 
			vpn: String
		},
		wireless: {
			ssid: String,
			encryption: String,
			mgmtURL: String
		},
		vpn: {
			vpnType: String,
			pskLocation: String,
			publicIP: String,
			vpnClient: String
		}
	},
	servers: []
});

const Companies = mongoose.model("Companies", companySchema);

//Company CRUD Functions
const createCompany = (companyName) => {
	Companies.create({ 
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
			localLocation: ""
		},
		email: {
			platform: "",
			webmail: "",
			server: "",
			domains: ""
		},
		fileShares: {
			server: "",
			rootPath: "",
			onPrem: false,
			driveLetters: ""
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
				vpn: ""
			},
			wireless: {
				ssid: "",
				encryption: "",
				mgmtURL: ""
			},
			vpn: {
				vpnType: "",
				pskLocation: "",
				publicIP: "",
				vpnClient: ""
			}
		},
		servers: []
	}, (err, company) => {
		if (err) return console.log(err);
		console.log("Created new company: " + company.name);
	});
};

const getCompany = (companyName,done) => {
	Companies.findOne({name: companyName}, (err, companyFound) => {
		if (err) return console.log(err);
		done(null,companyFound);
	});
};

const getAllCompanies = (done) => {
	Companies.find({}, (err, allCompany) => {
		if (err) return console.log(err);
		done(null,allCompany);
	});
};

const updateCompany = (companyName,objToUpdate,newValue, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if(err) return console.log(err);
		company[objToUpdate] = newValue;
		company.save((err, updatedCompany) => {
			if(err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

const deleteCompany = (companyName,done) => {
	Companies.findOneAndRemove({name: companyName}, (err, company) => {
		if(err) return console.log(err);
		done(null,company);
	});
};

//Article CRUD functions
const createArticle = (companyName, articleTitle, articleContent, done) => {
	Companies.findOne({name: companyName}, (err,company) => {
		if (err) return console.log(err);
		company.articles.push({title: articleTitle, content: articleContent});
		company.save((err,updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

//Applications CRUD functions
const createApp = (companyName, appObj, done) => {
	Companies.findOne({name: companyName}, (err,company) => {
		if (err) return console.log(err);
		company.apps.push(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

const deleteApp = (companyName, appObj, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		company.apps.pull(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

const updateApp = (companyName,oldApp,newApp,done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		appIndex = company.apps.findIndex(x => x.name === oldApp.name);
		if (appIndex < 0) {
			createApp(companyName,newApp,console.log);
		} else {
			company.apps.set(appIndex, newApp);
			company.save((err,updatedCompany) => {
				if (err) return console.log(err);
				done(null,updatedCompany)
			});
		}
	});
};

//Server Functions

const createServer = (companyName, serverObj, done) => {
	Companies.findOne({name: companyName}, (err,company) => {
		if (err) return console.log(err);
		company.servers.push(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

const deleteServer = (companyName, serverObj, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		company.servers.pull(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

const updateServer = (companyName,oldServer,newServer,done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		serverIndex = company.servers.findIndex(x => x.hostname === oldServer.hostname);
		if (serverIndex < 0) {
			createServer(companyName,newServer,console.log);
		} else {
			company.servers.set(serverIndex, newServer);
			company.save((err,updatedCompany) => {
				if (err) return console.log(err);
				done(null,updatedCompany)
			});
		}
	});
};




//Express config

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
	console.log("Server running on port: " + port);
});

//GET Requests
app.get("/companies/:company", (req,res) => {
	getCompany(req.params.company,(err,data)=> {
		console.log(req.params.company);
		res.json(data);
	});
});

app.get("/companies", (req,res) => {
	getAllCompanies((err,data) => {
		res.json(data);
	})
});

//POST Requests
app.post("/companies/create", (req,res) => {
	console.log(req.body.company);
	createCompany(req.body.company);
	res.send("Done");
})

app.post("/companies/:company/info", (req,res) => {
	updateCompany(req.body.company, "name", req.body.newName,console.log);
	updateCompany(req.body.newName, "address", req.body.address,console.log);
	updateCompany(req.body.newName, "emailAddr", req.body.emailAddr,console.log);
	updateCompany(req.body.newName, "phone", req.body.phone,console.log);
	res.send("Done");
});

app.post("/companies/:company/name", (req,res) => {
	updateCompany(req.body.company,"name",req.body.newName,console.log);
	res.send("Done");
});

app.post("/companies/:company/address", (req,res) => {
	updateCompany(req.body.company, "address", req.body.address, console.log);
	res.send("Done");
});

app.post("/companies/:company/email", (req,res) => {
	updateCompany(req.body.company, "emailAddr", req.body.emailAddr, console.log);
	res.send("Done");
});

app.post("/companies/:company/phone", (req,res) => {
	updateCompany(req.body.company, "phone", req.body.phone, console.log);
	res.send("Done");
});

app.post("/companies/:company/delete", (req,res) => {
	deleteCompany(req.body.company,console.log);
	res.send("Done");
});

app.post("/companies/articles/:company", (req, res) => {
	createArticle(req.body.company,req.body.title,req.body.content,console.log);
	res.send("Done");
});

app.post("/companies/apps/:company/create", (req,res) => {
	createApp(req.body.company, req.body.newApp, console.log);
	res.send("Done");
});

app.post("/companies/apps/:company/delete", (req,res) => {
	deleteApp(req.body.company, req.body.app, console.log);
	res.send("Done");
});

app.post("/companies/apps/:company/update", (req,res) => {
	updateApp(req.body.company, req.body.app, req.body.updatedApp, console.log);
	res.send("Done");
});

app.post("/companies/backups/:company/update", (req,res) => {
	updateCompany(req.body.company, "backups", req.body.backups, console.log);
	res.send("Done");
});

app.post("/companies/email/:company", (req,res) => {
	updateCompany(req.body.company, "email", req.body.email, console.log);
	res.send("Done");
});

app.post("/companies/shares/:company", (req,res) => {
	updateCompany(req.body.company, "fileShares", req.body.fileShares, console.log);
	res.send("Done");
});

app.post("/companies/networks/:company", (req, res) => {
	updateCompany(req.body.company, "networks", req.body.networks, console.log);
	res.send("Done");
});

app.post("/companies/servers/:company/create", (req,res) => {
	createServer(req.body.company, req.body.newServer, console.log);
	res.send("Done");
});

app.post("/companies/servers/:company/delete", (req,res) => {
	deleteServer(req.body.company, req.body.server, console.log);
	res.send("Done");
});

app.post("/companies/servers/:company/update", (req,res) => {
	updateServer(req.body.company, req.body.server, req.body.updatedServer, console.log);
	res.send("Done");
});


//tests

//updateRouter("g","192.168.0.0/24", "192.168.0.1", "ipsec", console.log);
//createCompany("test1");
//createCompany("test2");
//createCompany("test3");
//createCompany("test4");
//createCompany("test5");
//getCompany("fasd",(err, data) => console.log(data));
//updateCompany("g", "address", "10.0.0.24/24",console.log);
//createArticle("g","How to be a boss", "First thing's first, you just need to party",console.log);
//getAllCompanies(console.log);
//deleteCompany("29845",console.log)
//createApp("1234", {name: "OpenTHC", installer: "OpenTHC.com", notes: "TEST NOTES"}, console.log);
//createApp("1234", {name: "sage", installer: "OpenTHC.com", notes: "TEST NOTES"}, console.log);
//createApp("1234", {name: "metrc", installer: "OpenTHC.com", notes: "TEST NOTES"}, console.log);
//createApp("1234", {name: "healthwyse", installer: "OpenTHC.com", notes: "TEST NOTES"}, console.log);
//deleteApp("fasd", {name: "sage", installer: "OpenTHC.com"}, console.log);
//updateApp("fasd", {name: "metrc", installer: "OpenTHC.com"}, {name: "newSage", installer: "newInstaller.com"}, console.log)

