const mongoose = require('mongoose');
const constants = require('../constants/enum.constants');


const { Schema } = mongoose;
const { String, Date, Number, ObjectId } = Schema.Types;


const User = new Schema(
	{
		username: { type: String, trim: true, lowercase: true, index: true, required: true  },
		password: { type: String, required: true },
		sex: { type: Number, enum: [  constants.FEMALE_SEX, constants.MALE_SEX ], default: null },
		birthDateAt: { type: Date },
	},
	{
		timestamps: true,
	}
);


module.exports = mongoose.model('User', User);
