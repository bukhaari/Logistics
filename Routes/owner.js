const express = require('express');
const router = express.Router();
const controler = require('../Controler/owner')

router.get('/', controler.getOwners);
router.post('/',controler.createOwner);
router.get('/:id', controler.getOwner);
router.put('/:id', controler.updateOwner);
router.delete('/:id', controler.deleteOwner);

module.exports = router;