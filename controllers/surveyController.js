const Survey = require("../models/Survey"); // Make sure the path to your Survey model is correct

// Create a new survey
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all surveys
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ user: req.user.id });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update survey by ID
exports.updateSurvey = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    let survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.questions = questions || survey.questions;

    survey = await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete survey by ID
exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    await survey.remove();
    res.json({ message: "Survey removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update survey question by ID
exports.updateSurveyQuestion = async (req, res) => {
  const { surveyId, questionId } = req.params;
  const { text, options, required } = req.body;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const question = survey.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.text = text;
    question.options = options;
    question.required = required;

    await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete survey question by ID
exports.deleteSurveyQuestion = async (req, res) => {
  const { surveyId, questionId } = req.params;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const question = survey.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.remove();
    await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
