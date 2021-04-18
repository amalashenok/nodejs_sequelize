const router = require('express').Router();
const sessions = require('../controllers/sessionController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Service
router.post('/', sessions.create);

// Retrieve all Services
router.get('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, sessions.findAll);

// Retrieve a single Service with id
router.get('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, sessions.findOne);

// Update a Service with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, sessions.update);

// Delete a Service with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, sessions.delete);

// Delete all Services
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, sessions.deleteAll);

module.exports = router;
