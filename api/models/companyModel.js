const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, default: "" },
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
		localLocation: String,
	},
	email: {
		platform: String,
		webmail: String,
		server: String,
		domains: String,
	},
	fileShares: {
		server: String,
		rootPath: String,
		onPrem: Boolean,
		driveLetters: String,
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
			subnet: String,
			ipAddr: String,
			dhcp: Boolean,
			portForwards: String,
			notes: String,
			vpn: String,
		},
		wireless: {
			ssid: String,
			encryption: String,
			mgmtURL: String,
		},
		vpn: {
			vpnType: String,
			pskLocation: String,
			publicIP: String,
			vpnClient: String,
		},
	},
	servers: [],
});

const Companies = mongoose.model("Companies", companySchema);

module.exports = Companies;
