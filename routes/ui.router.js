const express = require('express');

const controller = require('../controllers/ui.controller');
const { authorizationUI } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get(`/`, authorizationUI, controller.homeUI);
router.get(`/login`, controller.authUI);
router.get(`/signup`, controller.signupUI);
router.get(`/votes`, authorizationUI, controller.myVotingUI);
router.get(`/votes/new`, authorizationUI, controller.createVoteUI);
router.get(`/votes/:voteId`, authorizationUI, controller.voteById);

router.get(`/*`, authorizationUI, controller.notFound);


 

// router.get(`${config.DEFAULT_VERSION_API}/orders/archived`, authorization([ constants.MANAGER_ROLE, constants.EXECUTOR_ROLE ]),  onValidation(getOrdersValidation), controller.getOrdersArchived);

// router.post(`${config.DEFAULT_VERSION_API}/orders/sync`, authorization([ constants.MANAGER_ROLE ]), onValidation(fetchOrdersValidation), controller.fetch);
// router.post(`${config.DEFAULT_VERSION_API}/orders`, authorization([ constants.MANAGER_ROLE ]), controller.createOrder);


// router.put(`${config.DEFAULT_VERSION_API}/orders/status`, authorization([ constants.MANAGER_ROLE, constants.EXECUTOR_ROLE ]), onValidation(updateStatusValidation), controller.updateStatus);
// router.put(`${config.DEFAULT_VERSION_API}/orders/assign`, authorization([ constants.MANAGER_ROLE ]), onValidation(updateAssignValidation), controller.updateAssign);
// router.put(`${config.DEFAULT_VERSION_API}/orders/archive`, authorization([ constants.MANAGER_ROLE ]), onValidation(archiveValidation), controller.archived);
// router.put(`${config.DEFAULT_VERSION_API}/orders/unarchive`, authorization([ constants.MANAGER_ROLE ]), onValidation(archiveValidation), controller.unarchived);
// router.put(`${config.DEFAULT_VERSION_API}/orders/cancel`, authorization([ constants.MANAGER_ROLE ]), onValidation(archiveValidation), controller.canceled);
// router.put(`${config.DEFAULT_VERSION_API}/orders/uncancel`, authorization([ constants.MANAGER_ROLE ]), onValidation(archiveValidation), controller.uncanceled);
// router.delete(`${config.DEFAULT_VERSION_API}/orders/:orderId`, authorization([ constants.MANAGER_ROLE ]), controller.delete);



module.exports = router;