const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  text: { type: String, required: true },
});

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: [OptionSchema],
  required: { type: Boolean, default: false },
});

const SurveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Survey", SurveySchema);
