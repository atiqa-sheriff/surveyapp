const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Survey = require("../models/Survey");

router.get("/", auth, async (req, res) => {
  try {
    const surveys = await Survey.find({ user: req.user.id });
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
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
});

router.get("/:id", auth, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    let survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, questions } },
      { new: true }
    );

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    await survey.remove();

    res.json({ msg: "Survey removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
