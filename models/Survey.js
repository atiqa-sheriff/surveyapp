const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Option Schema
const OptionSchema = new Schema({
  text: { type: String, required: true },
});

// Question Schema
const QuestionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  options: [OptionSchema],
  required: { type: Boolean, default: false },
});

// Survey Schema
const SurveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [QuestionSchema],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Survey", SurveySchema);
