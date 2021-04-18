const router = require('express').Router();

const addresses = require('../controllers/addressController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Address
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, addresses.create);

// Retrieve all Addresses
router.get('/', addresses.findAll);

// Retrieve a single Address with id
router.get('/:id', addresses.findOne);

// Update a Address with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, addresses.update);

// Delete a Address with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, addresses.delete);

// Delete all Addresses
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, addresses.deleteAll);

module.exports = router;
