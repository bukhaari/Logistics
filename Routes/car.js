const express = require("express");
const router = express.Router();
const upload = require("../Midleware/upload");
const controler = require("../Controler/car");

router.get("/", controler.getCars);
router.post("/", controler.createCar);
router.get("/:id", controler.getCar);
router.put("/:id", controler.updateCar);
router.delete("/:id", controler.deleteCar);

module.exports = router;
