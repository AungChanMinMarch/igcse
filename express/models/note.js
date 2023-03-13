const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
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
		type: Number, // order to show
		required: true
	},
	note: {
		type: String,
	}
});
module.exports = mongoose.model("lectureNote", noteSchema);
