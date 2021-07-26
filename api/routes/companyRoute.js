const {getCompany, getAllCompanies } = require("../controllers/companyController");
const router = require("express").Router();

router.post("/", getAllCompanies);
router.post("/:company", getCompany);


module.exports = router;