const router = require('express').Router();
const roles = require('../controllers/roleController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');
// [check("Authorization", "Токен отсутствует").notEmpty()],
//     authMiddleWare,
// Create a new Role
router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.create);

// Retrieve all Roles
router.get('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.findAll);

// Retrieve all active Roles
router.get('/active', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.findAllActive);

// Retrieve a single Role with id
router.get('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.findOne);

// Update a Role with id
router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.update);

// Delete a Role with id
router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.delete);

// Delete all Roles
router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, roles.deleteAll);

module.exports = router;
