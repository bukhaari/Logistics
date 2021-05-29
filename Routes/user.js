const express = require("express");
const router = express.Router();
const controler = require("../Controler/user");
const auth = require("../Midleware/auth");
const admin = require("../Midleware/admin");

router.post("/", controler.createUser);
router.get("/me", controler.getUser);

module.exports = router;
