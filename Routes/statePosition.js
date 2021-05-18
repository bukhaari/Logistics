const express = require("express");
const router = express.Router();
const controler = require("../Controler/statePosition");

router.get("/", controler.getStatePositions);
router.post("/", controler.createStatePosition);
router.get("/:id", controler.getStatePosition);
router.put("/:id", controler.updateStatePosition);
router.delete("/:id", controler.deleteStatePosition);

module.exports = router;
