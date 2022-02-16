const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const helmet = require("helmet");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const companyRoute = require("./routes/companyRoute");
require("dotenv").config();
const path = require("path");

mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => {
		console.log("Connected to Database");
	}
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(helmet());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/companies", companyRoute);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
	console.log("Server listening on port: " + process.env.PORT);
});
