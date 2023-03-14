const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const practicalQuestionSchema = new Schema({
	chapter: {
		type: Number,
		required: true,
		min: [1, 'chapter must be at least 1, got {VALUE}']
		// max: [16, 'chapter must be at most 16, got {VALUE}']
	},
	subChapter: {
		type: Number,
		required: true,
		min: [1, 'subchapter must be at least 1, got {VALUE}']
	},
	noteNumber: {
		type: Number,
		required: true
	},
	qp: [{ //question paper e.g. 22march1
		type: String,
		required: true
	}],
	number: [{
		type: Number,
		// required: true, may not be paper 1 or 2
		min: [1, 'choice_question number must be at least 1, got {VALUE}'],
		max: [40, 'choice_question number must be at most 40, got {VALUE}']
	}],
	content: {
		type: String,
	}
});
module.exports = mongoose.model("practicalQuestion", practicalQuestionSchema);
