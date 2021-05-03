const express = require("express");
const router = express.Router();
const upload = require("../Midleware/upload");
const controler = require("../Controler/Driver");

router.get("/", controler.getDrivers);
router.post("/", upload.single("licenseImage"), controler.createDriver);
router.get("/:id", controler.getDriver);
router.put("/:id", controler.updateDriver);
router.delete("/:id", controler.deleteDriver);

module.exports = router;
