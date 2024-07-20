const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  updateSurveyQuestion,
  deleteSurveyQuestion,
} = require("../controllers/surveyController");

// Create a new survey
router.post("/", auth, createSurvey);

// Get all surveys
router.get("/", auth, getSurveys);

// Get survey by ID
router.get("/:id", auth, getSurveyById);

// Update survey by ID
router.put("/:id", auth, updateSurvey);

// Delete survey by ID
router.delete("/:id", auth, deleteSurvey);

// Update a specific question within a survey
router.put("/:surveyId/questions/:questionId", auth, updateSurveyQuestion);

// Delete a specific question within a survey
router.delete("/:surveyId/questions/:questionId", auth, deleteSurveyQuestion);

module.exports = router;
