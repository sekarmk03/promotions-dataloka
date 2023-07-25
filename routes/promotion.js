const express = require('express');
const router = express.Router();
const c = require('../controllers');
const authorize = require('../middlewares/authorize');

router.get('/', authorize(), c.promotion.index);
router.post('/', authorize(), c.promotion.create);
router.get('/:id', authorize(), c.promotion.show);
router.put('/:id', authorize(), c.promotion.update);
router.delete('/:id', authorize(), c.promotion.delete);

module.exports = router;