const Router = require('express');
const { check } = require('express-validator');
const router = new Router();
const authMiddleWare = require('../middlewares/auth.middleware.js');
const roleMiddleWare = require('../middlewares/role.middleware');
const authController = require('../controllers/authController');

router.post(
  '/registration',
  [check('email', 'почта не может быть пустой').notEmpty(), check('password', 'пароль не может быть пустым').notEmpty()],
  authController.registration,
);
router.post(
  '/login',
  [check('email', 'почта не может быть пустой').notEmpty(), check('password', 'пароль не может быть пустым').notEmpty()],
  authController.login,
);

router.get('/user', [check('Authorization', 'Токен отсутствует').notEmpty()], authMiddleWare, authController.getUser);

router.get('/logout', authController.logout);

module.exports = router;
