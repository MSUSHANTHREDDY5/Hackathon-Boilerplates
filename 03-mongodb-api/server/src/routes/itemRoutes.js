const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.create);
router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);
router.patch('/:id', itemController.update);
router.delete('/:id', itemController.remove);

module.exports = router;
