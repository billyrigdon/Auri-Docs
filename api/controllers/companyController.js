//Company CRUD Functions
export const createCompany = (companyName) => {
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

export const getCompany = (companyName,done) => {
	Companies.findOne({name: companyName}, (err, companyFound) => {
		if (err) return console.log(err);
		done(null,companyFound);
	});
};

export const getAllCompanies = (done) => {
	Companies.find({}, (err, allCompany) => {
		if (err) return console.log(err);
		done(null,allCompany);
	});
};

export const updateCompany = (companyName,objToUpdate,newValue, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if(err) return console.log(err);
		company[objToUpdate] = newValue;
		company.save((err, updatedCompany) => {
			if(err) return console.log(err);
			done(null, updatedCompany);
		});
	});
};

export const deleteCompany = (companyName,done) => {
	Companies.findOneAndRemove({name: companyName}, (err, company) => {
		if(err) return console.log(err);
		done(null,company);
	});
};

//Article CRUD functions
export const createArticle = (companyName, articleTitle, articleContent, done) => {
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
export const createApp = (companyName, appObj, done) => {
	Companies.findOne({name: companyName}, (err,company) => {
		if (err) return console.log(err);
		company.apps.push(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

export const deleteApp = (companyName, appObj, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		company.apps.pull(appObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

export const updateApp = (companyName,oldApp,newApp,done) => {
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

export const createServer = (companyName, serverObj, done) => {
	Companies.findOne({name: companyName}, (err,company) => {
		if (err) return console.log(err);
		company.servers.push(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

export const deleteServer = (companyName, serverObj, done) => {
	Companies.findOne({name: companyName}, (err, company) => {
		if (err) return console.log(err);
		company.servers.pull(serverObj);
		company.save((err, updatedCompany) => {
			if (err) return console.log(err);
			done(null, updatedCompany)
		});
	});
};

export const updateServer = (companyName,oldServer,newServer,done) => {
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