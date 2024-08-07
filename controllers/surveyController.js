const Survey = require("../models/Survey");
const logger = require("../config/logger");

exports.createSurvey = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newSurvey = new Survey({
      title,
      description,
      questions,
      user: req.user.id,
    });

    const survey = await newSurvey.save();
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

try {
  logger.info(`Creating survey with data: ${JSON.stringify(surveyData)}`);
  const newSurvey = new Survey(surveyData);
  await newSurvey.save();
  res.json(newSurvey);
} catch (error) {
  logger.error(`Error creating survey: ${error.message}`);
  res.status(500).send("Server Error");
}

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ user: req.user.id });
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.status(500).send("Server error");
  }
};

exports.updateSurvey = async (req, res) => {
  const { title, description, questions } = req.body;

  const surveyFields = {
    title,
    description,
    questions: questions.map((q) => ({
      text: q.text,
      options: q.options.map((opt) => ({ text: opt.text })),
      required: q.required,
    })),
  };

  try {
    let survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    if (survey.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { $set: surveyFields },
      { new: true }
    );

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.status(500).send("Server error");
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    if (survey.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await survey.remove();

    res.json({ msg: "Survey removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.status(500).send("Server error");
  }
};
