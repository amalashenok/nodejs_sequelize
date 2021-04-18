const router = require('express').Router();
const tags = require('../controllers/tagController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Service
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, tags.create);

// Retrieve all Services
router.get('/', tags.findAll);

// Retrieve all active Services
router.get('/active', tags.findAllActive);

// Retrieve a single Service with id
router.get('/:id', tags.findOne);

// Update a Service with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, tags.update);

// Delete a Service with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, tags.delete);

// Delete all Services
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, tags.deleteAll);

module.exports = router;
