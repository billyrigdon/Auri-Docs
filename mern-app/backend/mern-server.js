//Dependencies
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('dotenv').config();

//Global Variables
const port = process.env.PORT


//Mongoose Schema and functions to CRUD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const companySchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: {type: String, default:""},
	articles: [],
	apps: [],
	backups: {
		technology: String,
		window: String,
		frequency: String
	},
	email: {
		platform: String,
		webmail: String,
		emailServer: String,
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
		articles: [],
		apps: [],
		backup: {
			technology: "",
			window: "",
			frequency: ""
		},
		email: {
			platform: "",
			webmail: "",
			emailServer: "",
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

//Router CRUD functions
const updateRouter = (companyName, subnetVal, ipAddrVal, dhcpVal, portForVal,notesVal, vpnVal, done) => {
	Companies.findOne({name:companyName}, (err, company) => {
		if (err) return console.log(err);
		console.log(ipAddrVal)
		company.router.ipAddr = ipAddrVal;
		company.router.subnet = subnetVal;
		company.router.dhcp = dhcpVal;
		company.router.portForwards = portForVal;
		company.router.notes = notesVal;
		company.router.vpn = vpnVal;
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
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

//tests

//updateRouter("g","192.168.0.0/24", "192.168.0.1", "ipsec", console.log);
createCompany("Lotus Gold");
//getCompany("Afghan Kush",(err, data) => console.log(data));
//updateCompany("g", "address", "10.0.0.24/24",console.log);
//createArticle("g","How to be a boss", "First thing's first, you just need to party",console.log);


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
		res.json(data);
	});
});

app.get("/companies"), (req.res) => {
	getAllComp
});

//POST Requests
app.post("/companies/articles/:company", (req, res) => {
	createArticle(req.body.company,req.body.title,req.body.content,console.log);
	res.send("Done");
})

