const express = require('express');
const router = express.Router();

const auth = require('./auth');
const promotion = require('./promotion');

router.use('/auth', auth);
router.use('/promotions', promotion);

module.exports = router;