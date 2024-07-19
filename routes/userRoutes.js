const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

// Register a user
router.post("/", registerUser);

// Login a user
router.post("/auth", loginUser);

// Update user details
router.put("/:id", auth, updateUser);

// Delete user
router.delete("/:id", auth, deleteUser);

// Get all users
router.get("/", auth, getAllUsers);

// Get user by ID
router.get("/:id", auth, getUserById);

module.exports = router;
