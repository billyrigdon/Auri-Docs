const {getCompany} = require("../controllers/companyController");
const router = require("express").Router();

router.post("/:company", getCompany);

module.exports = router;