const mongoose = require('mongoose');
const constants = require('../constants/enum.constants');


const { Schema } = mongoose;
const { String, Date, Number, ObjectId } = Schema.Types;


const Questionnaire = new Schema(
	{
		ownerId: { type: ObjectId, ref:"User", required: true },
		question: { type: String, default: '' },
		answers: [
			{ 
				_id: { type: ObjectId, default: mongoose.Types.ObjectId },
				text: { type: String, default: '' }
			}
		],
		votes: [
			{ 
				ownerId: { type: ObjectId, ref:"User" },
				answerId: { type: ObjectId, required: true }
			}
		],
	},
	{
		timestamps: true,
	}
);


module.exports = mongoose.model('Questionnaire', Questionnaire);
