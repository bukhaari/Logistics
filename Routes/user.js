const express = require("express");
const router = express.Router();
const controler = require("../Controler/user");

router.get("/", controler.getUsers);
router.post("/", controler.createUser);
router.get("/:id", controler.getUser);
router.put("/:id", controler.updateUser);
router.delete("/:id", controler.deleteUser);

module.exports = router;
