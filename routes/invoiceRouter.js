const router = require('express').Router();
const invoices = require('../controllers/invoiceController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new invoice
router.post('/', invoices.create);

// Retrieve all invoices
router.get('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.findAll);

// Retrieve all active invoices
router.get('/active', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.findAllActive);

// Retrieve a single invoice with id
router.get('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.findOne);

// Update a invoice with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.update);

// Delete a invoice with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.delete);

// Delete all invoices
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, invoices.deleteAll);

module.exports = router;
