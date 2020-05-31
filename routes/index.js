const user = require('./user.router.js');
const questionnaire = require('./questionnaire.router');
const ui = require('./ui.router.js');






module.exports = app => {
	app.use(user);
	app.use(questionnaire);
	app.use(ui);
};
