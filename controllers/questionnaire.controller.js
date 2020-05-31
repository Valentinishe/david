const { Types } = require('mongoose');
const QuestionnaireModel = require('../models/questionnaire.model');
const Auth = require('../utils/auth');
const WSS_SERVICES = require('../services/wss.service');



exports.create = async (req, res) => {
	try {
		const { userId } = req.jwt
		const  { question = '', answers = [] } = req.body;
		
        
        if(question == '') return res.status(400).send('Question is required!');
        if(!Array.isArray(answers) || answers.length < 1 ) return res.status(400).send('Answers - must contain at least one answer!');
		


		const questionnaire = new QuestionnaireModel({
			ownerId: userId,
			question,
			answers: answers.map( answer => ({ _id: Types.ObjectId(), text: answer })),
			votes: []
		});
 
		await questionnaire.save();

		res.json({ data: questionnaire });


	} catch(e) {
		console.log('#error# - create voting controller', e);
		res.status(500).send(String(e));
	}
};


exports.update = async (req, res) => {
	try {
		const { userId } = req.jwt
		const { questionnaireId } = req.params;
		const { question, answers } = req.body;
		
        
        if(question === undefined) return res.status(400).send('Question is required!');
		if(answers === undefined ) return res.status(400).send('Answers is required!');
        if(!Array.isArray(answers) || answers.length < 1 ) return res.status(400).send('Answers - must contain at least one answer!');
		

		const questionnaire = await QuestionnaireModel.findOne({ _id: questionnaireId }).lean();
		if(!questionnaire) return res.status(404).send('Voting is not found!');
		if(questionnaire.votes.length > 0) return res.status(403).send('Voting is denied! Already exist a first vote!');
		if(String(questionnaire.ownerId) !== userId) return res.status(403).send('Access Denied for update voting!');
		

		const questionnaireNew = await QuestionnaireModel.findOneAndUpdate({ _id: questionnaireId }, { question, answers }, { new: true });
		res.json({ data: questionnaireNew });


	} catch(e) {
		console.log('#error# - update voting controller', e);
		res.status(500).send(String(e));
	}
};






exports.delete = async (req, res) => {
	try {
		const { userId } = req.jwt
		const { questionnaireId } = req.params;

		const questionnaire = await QuestionnaireModel.findOne({ _id: questionnaireId }).lean();
		if(!questionnaire) return res.status(404).send('Voting is not found!');
		if(questionnaire.votes.length > 0) return res.status(403).send('Voting is denied! Already exist a first vote!');
		if(String(questionnaire.ownerId) !== userId) return res.status(403).send('Access Denied for update voting!');

		await QuestionnaireModel.findOneAndRemove({ _id: questionnaireId });
		res.status(204);


	} catch(e) {
		console.log('#error# - update voting controller', e);
		res.status(500).send(String(e));
	}
};


exports.getMy = async (req, res) => {
	try {
		const { userId } = req.jwt

		const questionnaire = await QuestionnaireModel.find({ ownerId: userId }).lean();
		res.json({ data: questionnaire });

	} catch(e) {
		console.log('#error# - getMy votings controller', e);
		res.status(500).send(String(e));
	}
};


exports.getOne = async (req, res) => {
	try {
		const { userId } = req.jwt
		const { questionnaireId } = req.params;

		const questionnaire = await QuestionnaireModel.findOne({ _id: questionnaireId }).lean();
		if(!questionnaire) return res.status(404).send('Voting is not found!');

		res.json({ data: questionnaire });


	} catch(e) {
		console.log('#error# - getOne voting controller', e);
		res.status(500).send(String(e));
	}
};


exports.addVote = async (req, res) => {
	try {
		const { userId } = req.jwt
		const { questionnaireId, answerId } = req.params;

		const questionnaire = await QuestionnaireModel.findOne({ _id: questionnaireId }).lean();
		if(!questionnaire) return res.status(404).send('Voting is not found!');

		let votesNew = [];
		const myVote = questionnaire.votes.find( vote => String(vote.ownerId) === userId );
		if(myVote) {
			votesNew = questionnaire.votes.map( 
				vote =>  String(vote.ownerId) === userId 
					?  { ...vote, answerId: Types.ObjectId(answerId) }
					: vote
			);
		} else {
			votesNew = [ 
				...questionnaire.votes, 
				{ answerId: Types.ObjectId(answerId), ownerId: Types.ObjectId(userId) } 
			]
		}

		const udpated = await QuestionnaireModel.findByIdAndUpdate({ _id: questionnaireId  }, { votes: votesNew }, { new: true });

		await WSS_SERVICES.sendMessage({ event: "VOTE_EVENT", data: udpated });
		res.json({ data: udpated });


	} catch(e) {
		console.log('#error# - addVote controller', e);
		res.status(500).send(String(e));
	}
};





