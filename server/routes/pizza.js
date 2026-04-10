const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addOption, listOptions } = require('../controllers/pizzaController');

router.post('/option', auth, addOption); // admin
router.get('/options', auth, listOptions);

module.exports = router;