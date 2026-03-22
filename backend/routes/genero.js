const { Router } = require('express');
const { getGeneros, createGenero, updateGenero, deleteGenero } = require('../controllers/generocontroller');

const router = Router();

router.get('/', getGeneros);
router.post('/', createGenero);
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

module.exports = router;