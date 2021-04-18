const router = require('express').Router();

const subcategories = require('../controllers/subcategoryController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, subcategories.create);

router.get('/', subcategories.findAll);

router.get('/active', subcategories.findAllActive);

router.get('/:id', subcategories.findOne);

router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, subcategories.update);

router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, subcategories.delete);

router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, subcategories.deleteAll);

module.exports = router;
