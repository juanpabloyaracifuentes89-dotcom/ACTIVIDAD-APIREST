const { Router } = require('express');
const { getProductoras, createProductora, updateProductora, deleteProductora } = require('../controllers/productoracontrollers');

const router = Router();

router.get('/', getProductoras);
router.post('/', createProductora);
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;