const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionPaperSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	number: [{
		type: Number,
		required: true,
		min: [1, 'choice_question number must be at least 1, got {VALUE}'],
		max: [40, 'choice_question number must be at most 40, got {VALUE}']
	}]
})
const choice_questionSchema = new Schema({
	chapter: {
		type: Number,
		min: [1, 'chapter must be at least 1, got {VALUE}']
		// max: [16, 'chapter must be at most 16, got {VALUE}']
	},
	subChapter: {
		type: Number,
		min: [1, 'subchapter must be at least 1, got {VALUE}']
	},
	noteNumber: {
		type: Number,
	},
	paper: [{ //question paper e.g. 22march1
		type: [questionPaperSchema],
		required: true
	}],
	content: {
		type: String,
	},
	answer : {
		type: Number,
		min: [0, 'chapter must be at least 0, got {VALUE}'],
		max: [3, 'chapter must be at most 3, got {VALUE}']
	}
});
module.exports = mongoose.model("choiceQuestion", choice_questionSchema);
