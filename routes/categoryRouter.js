const router = require('express').Router();

const categories = require('../controllers/categoryController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

// Create a new Category
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, categories.create);

// Retrieve all Categories
router.get('/', categories.findAll);

// Retrieve all active Categories
router.get('/active', categories.findAllActive);

// Retrieve a single Category with id
router.get('/:id', categories.findOne);

// Update a Category with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, categories.update);

// Delete a Category with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, categories.delete);

// Delete all Categories
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, categories.deleteAll);

module.exports = router;
