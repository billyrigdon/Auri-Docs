const router = require("express").Router();
const { createUser, loginUser} = require("../controllers/userController")

router.route("/create").post(createUser);
router.route("/login").post(loginUser);

module.exports = router