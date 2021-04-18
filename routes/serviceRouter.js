const router = require('express').Router();
const services = require('../controllers/serviceController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Service
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, services.create);

// Retrieve all Services
router.get('/', services.findAll);

// Retrieve all active Services
router.get('/active', services.findAllActive);

// Retrieve a single Service with id
router.get('/:id', services.findOne);

// Update a Service with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, services.update);

// Delete a Service with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, services.delete);

// Delete all Services
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, services.deleteAll);

module.exports = router;
