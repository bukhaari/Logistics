const express = require('express');
const router = express.Router();
const controler = require('../Controler/owner')

router.post('/',controler.createOwner);
router.get('/', controler.getOwners);

module.exports = router;