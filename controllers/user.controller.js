const UsersModel = require('../models/user.model');
const Auth = require('../utils/auth');


exports.signup = async (req, res) => {
	try {
        const  { username = '', birthDateAt='', sex=null, password='' } = req.body;
        
        if(!username) return res.status(400).send('Username is required!');
        if(!birthDateAt === undefined) return res.status(400).send('Date of Birth is required!');
        if(sex === null) return res.status(400).send('Sex is required!');
        if(!password) return res.status(400).send('Password is required!');


		const hashPassword = Auth.generateHash(password);

		// check user on exist username
		const userExist = await UsersModel.findOne({ username }).lean();
		if(userExist) return res.status(400).send('Username is already exist!')

		console.log('rea', req.body);
        // create user
        const user = new UsersModel({ username, password: hashPassword, sex, birthDateAt });
        await user.save();

        // gerate token
		const { token } = Auth.generateToken({ userId: user._id });

		res.json({ token });


	} catch(e) {
		console.log('#error# - signup controller', e);
		res.status(500).send(String(e));
	}
};







exports.auth = async (req, res) => {
	try {
        const { username, password } = req.body;
       
        if(username === undefined) return res.status(400).send('Email is required!');
        if(password === undefined) return res.status(400).send('Password is required!');

        // get password hash for compare
		const hashPassword = Auth.generateHash(password);

		// check user
		const user = await UsersModel.findOne({ username, password: hashPassword }).lean();
		console.log('user', user, hashPassword);
		if (!user) return res.status(401).send("Invalid username or password!");
		
	    // gerate token
		const { token } = Auth.generateToken({ userId: user._id });

		res.json({ token });

	} catch(e) {
		console.log('#error# - auth controller', e);

		res.status(500).send(String(e));
	}
}


