const { Router } = require('express');
const { getGeneros, createGenero } = require('../controllers/generocontroller');

const router = Router();

router.get('/', getGeneros);
router.post('/', createGenero);

module.exports = router;