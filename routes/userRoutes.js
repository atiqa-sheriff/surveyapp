const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  profile,
} = require("../controllers/userController");

router.get("/", auth, getAllUsers);

router.get("/profile", auth, profile);

router.get("/:id", auth, getUserById);

router.put("/:id", auth, updateUser);

router.delete("/:id", auth, deleteUser);

module.exports = router;
