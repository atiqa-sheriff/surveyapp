const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const surveyController = require("../controllers/surveyController");

// Create a new survey
router.post("/", auth, surveyController.createSurvey);

// Get all surveys
router.get("/", auth, surveyController.getSurveys);

// Get survey by ID
router.get("/:id", auth, surveyController.getSurveyById);

// Update survey by ID
router.put("/:id", auth, surveyController.updateSurvey);

// Delete survey by ID
router.delete("/:id", auth, surveyController.deleteSurvey);

// Update survey question by ID
router.put(
  "/:surveyId/questions/:questionId",
  auth,
  surveyController.updateSurveyQuestion
);

// Delete survey question by ID
router.delete(
  "/:surveyId/questions/:questionId",
  auth,
  surveyController.deleteSurveyQuestion
);

module.exports = router;
