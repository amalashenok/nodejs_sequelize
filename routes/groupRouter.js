const router = require('express').Router();

const groups = require('../controllers/groupController');
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const { check } = require('express-validator');

router.post('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, groups.create);

router.get('/', groups.findAll);

router.get('/:id', groups.findOne);

router.put('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, groups.update);

router.delete('/:id', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, groups.delete);

router.delete('/', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, groups.deleteAll);

module.exports = router;
