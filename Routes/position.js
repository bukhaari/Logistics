const express = require('express');
const router = express.Router();
const controler = require('../Controler/position')

router.get('/', controler.getPositions);
router.post('/',controler.createPosition);
router.get('/:id', controler.getPosition);
router.put('/:id', controler.updatePosition);
router.delete('/:id', controler.deletePosition);

module.exports = router;