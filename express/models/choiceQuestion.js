const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const choice_questionSchema = new Schema({
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
	keypoint: {
		type: Number,
		default: 999,
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
	q: {
		type: String,
	},
	choices: [{
		type: Schema.Types.Mixed //may be string(mostly) or array(table)
	}],
	choice_ths: [String], //sometimes some choice is from table e.g.22march1 no.5
	correctChoice : {
		type: Number,
		required: true,
		min: [0, 'chapter must be at least 0, got {VALUE}'],
		max: [3, 'chapter must be at most 3, got {VALUE}']
	}
});
module.exports = mongoose.model("choiceQuestion", choice_questionSchema);
