const express = require('express');
const router = express.Router();
const controler = require('../Controler/carType')

router.get('/', controler.getCarTypes);
router.post('/',controler.createCarType);
router.get('/:id', controler.getCarType);
router.put('/:id', controler.updateCarType);
router.delete('/:id', controler.deleteCarType);

module.exports = router;