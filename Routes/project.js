const express = require("express");
const router = express.Router();
const controler = require("../Controler/project");

router.get("/", controler.getProjects);
router.post("/", controler.createProject);
router.get("/:id", controler.getProject);
router.put("/:id", controler.updateProject);
router.put("/status/:id", controler.updeSatus);
router.delete("/:id", controler.deleteProject);

module.exports = router;
