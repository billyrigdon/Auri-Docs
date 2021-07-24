import {
	updateServer,
	deleteServer,
	createServer,
	updateApp,
	deleteApp,
	createApp,
	createArticle,
	deleteCompany,
	updateCompany,
	getAllCompanies,
	getCompany,
	createCompany
} from "../controllers/companyController";

const router = require("express").Router();

router.route("/create")

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