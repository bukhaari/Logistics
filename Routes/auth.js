const express = require("express");
const router = express.Router();
const controler = require("../Controler/login");

router.post("/", controler.login);

module.exports = router;
