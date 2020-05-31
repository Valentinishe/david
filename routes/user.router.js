const express = require('express');
const { authorization } = require('../middlewares/auth.middleware');
const controller = require('../controllers/user.controller');
const config = require('../config');
const constants = require('../constants/enum.constants');

const router = express.Router();

router.post(`${config.DEFAULT_VERSION_API}/users/auth`, controller.auth);
router.post(`${config.DEFAULT_VERSION_API}/users/signup`, controller.signup);


module.exports = router;