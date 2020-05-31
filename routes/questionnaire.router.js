const express = require('express');
const { authorizationAPI } = require('../middlewares/auth.middleware');
const controller = require('../controllers/questionnaire.controller');
const config = require('../config');
const constants = require('../constants/enum.constants');

const router = express.Router();

router.get(`${config.DEFAULT_VERSION_API}/questionnaire/my`, authorizationAPI, controller.getMy);
router.post(`${config.DEFAULT_VERSION_API}/questionnaire`, authorizationAPI, controller.create);

router.get(`${config.DEFAULT_VERSION_API}/questionnaire/:questionnaireId`, authorizationAPI, controller.getOne);
router.put(`${config.DEFAULT_VERSION_API}/questionnaire/:questionnaireId/vote/:answerId`, authorizationAPI, controller.addVote);
router.patch(`${config.DEFAULT_VERSION_API}/questionnaire/:questionnaireId`, authorizationAPI, controller.update);
router.delete(`${config.DEFAULT_VERSION_API}/questionnaire/:questionnaireId`, authorizationAPI, controller.delete);



module.exports = router;