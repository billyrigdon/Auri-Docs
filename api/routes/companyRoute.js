const companyController = require("../controllers/companyController");
const router = require("express").Router();

router.post("/get/", companyController.getAllCompanies);
router.post("/get/:company", companyController.getCompany);

router.post("/create", (req, res) => {
	if (req.body.company) {
		companyController.createCompany(req.body.company);
		res.send("Done");
	} else {
		res.send("failed");
	}
});

router.post("/update/:company/info", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"address",
		req.body.address,
		console.log
	);
	companyController.updateCompany(
		req.body.company,
		"emailAddr",
		req.body.emailAddr,
		console.log
	);
	companyController.updateCompany(
		req.body.company,
		"phone",
		req.body.phone,
		console.log
	);
	companyController.updateCompany(
		req.body.company,
		"name",
		req.body.newName,
		console.log
	);
	res.send("Done");
});

router.post("/update/:company/name", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"name",
		req.body.newName,
		console.log
	);
	res.send("Done");
});

router.post("/update/:company/address", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"address",
		req.body.address,
		console.log
	);
	res.send("Done");
});

router.post("/update/:company/email", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"emailAddr",
		req.body.emailAddr,
		console.log
	);
	res.send("Done");
});

router.post("/update/:company/phone", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"phone",
		req.body.phone,
		console.log
	);
	res.send("Done");
});

router.post("/delete/:company/delete", (req, res) => {
	companyController.deleteCompany(req.body.company, console.log);
	res.send("Done");
});

router.post("/articles/:company", (req, res) => {
	companyController.createArticle(
		req.body.company,
		req.body.title,
		req.body.content,
		console.log
	);
	res.send("Done");
});

router.post("/apps/:company/create", (req, res) => {
	companyController.createApp(req.body.company, req.body.newApp, console.log);
	res.send("Done");
});

router.post("/apps/:company/delete", (req, res) => {
	companyController.deleteApp(req.body.company, req.body.app, console.log);
	res.send("Done");
});

router.post("/apps/:company/update", (req, res) => {
	companyController.updateApp(
		req.body.company,
		req.body.app,
		req.body.updatedApp,
		console.log
	);
	res.send("Done");
});

router.post("/backups/:company/update", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"backups",
		req.body.backups,
		console.log
	);
	res.send("Done");
});

router.post("/email/:company", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"email",
		req.body.email,
		console.log
	);
	res.send("Done");
});

router.post("/shares/:company", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"fileShares",
		req.body.fileShares,
		console.log
	);
	res.send("Done");
});

router.post("/networks/:company", (req, res) => {
	companyController.updateCompany(
		req.body.company,
		"networks",
		req.body.networks,
		console.log
	);
	res.send("Done");
});

router.post("/servers/:company/create", (req, res) => {
	companyController.createServer(
		req.body.company,
		req.body.newServer,
		console.log
	);
	res.send("Done");
});

router.post("/servers/:company/delete", (req, res) => {
	companyController.deleteServer(
		req.body.company,
		req.body.server,
		console.log
	);
	res.send("Done");
});

router.post("/servers/:company/update", (req, res) => {
	companyController.updateServer(
		req.body.company,
		req.body.server,
		req.body.updatedServer,
		console.log
	);
	res.send("Done");
});

module.exports = router;
