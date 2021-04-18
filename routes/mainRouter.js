const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

router.use(express.static(__dirname + '/public'));

// router.get("/", passport, apiController.login)

router.get('/', apiController.test);

module.exports = router;
