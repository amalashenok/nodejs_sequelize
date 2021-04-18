const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const sessionMiddleWare = require('../middlewares/session.middleware');

router.get('/', sessionMiddleWare, apiController.test);
router.get('/login', apiController.login);

router.post('/registration', apiController.registration);

module.exports = router;
