const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../Controllers/main");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
