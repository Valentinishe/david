const jwt = require('jsonwebtoken'); 
const path = require('path');
const JWT_SECRET = process.env.JWT_SECRET;



exports.authorizationAPI = (req, res, next) => {
	const token = req.cookies.JWT;

	if (token) {
		//check token
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) return res.responseErrorMessage({ status: 401, message:err.send });
			//decode the token
			req.jwt = decoded;
			next();
		});
	} else {

		console.log('req', req.headers);
		res.status(401).send("You are not authorized!");
	}
};

exports.authorizationUI = (req, res, next) => {
	const token = req.cookies.JWT;
	if (token) {
		//check token
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) return res.responseErrorMessage({ status: 401, message:err.send });
			//decode the token
			req.jwt = decoded;
			next();
		});
	} else {
		return res.sendFile(path.join(__dirname, '../public', '404.html'));
	}
};