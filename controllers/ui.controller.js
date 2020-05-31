const path = require('path');



exports.homeUI = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'myVoting.html'));
};

exports.authUI = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'login.html'));
};

exports.signupUI = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'signup.html'));
};

exports.myVotingUI = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'myVoting.html'));
};

exports.voteById = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'vote.html'));
};

exports.createVoteUI = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', 'createVote.html'));
};

exports.notFound = async (req, res) => {
	return res.sendFile(path.join(__dirname, '../public', '404.html'));
};

