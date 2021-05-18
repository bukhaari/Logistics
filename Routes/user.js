const express = require("express");
const router = express.Router();
const controler = require("../Controler/user");

router.get("/", controler.getUsers);
router.post("/", controler.createUser);
router.get("/:id", controler.getUser);

module.exports = router;
