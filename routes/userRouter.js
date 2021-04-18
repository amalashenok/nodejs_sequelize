const router = require('express').Router();
const users = require('../controllers/userController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new User
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.create);

// Retrieve all users
router.get('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.findAll);

// Retrieve all active users
router.get('/active', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.findAllActive);

// Retrieve a single User with id
router.get('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.findOne);

// Update a User with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.update);

// Delete a User with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, users.delete);

// Delete all users
router.delete('/', users.deleteAll);

module.exports = router;
