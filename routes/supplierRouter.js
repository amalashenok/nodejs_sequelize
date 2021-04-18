const router = require('express').Router();

const suplliers = require('../controllers/supplierController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Supplier
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, suplliers.create);

// Retrieve all Suppliers
router.get('/', suplliers.findAll);

// Retrieve a single Supplier with id
router.get('/:id', suplliers.findOne);

// Update a Supplier with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, suplliers.update);

// Delete a Supplier with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, suplliers.delete);

// Delete all Supplier
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, suplliers.deleteAll);

module.exports = router;
