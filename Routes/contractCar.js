const express = require("express");
const router = express.Router();
const controler = require("../Controler/contractCar");

router.get("/", controler.getContracts);
router.post("/", controler.createContract);
router.get("/:id", controler.getContract);
router.put("/:id", controler.updateContract);
router.put("/status/:id", controler.updeSatus);
router.delete("/:id", controler.deleteContract);

module.exports = router;
