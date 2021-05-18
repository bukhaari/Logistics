const express = require("express");
const router = express.Router();
const controler = require("../Controler/auth");

router.post("/", controler.login);

module.exports = router;
