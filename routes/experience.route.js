const express = require("express");
const {
  fetchAllExperiences,
  addNewExperience,
  editExperience,
  deleteExperience,
} = require("../controllers/experience.controller");
const { authMiddleware } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", fetchAllExperiences);
router.post("/add", authMiddleware, addNewExperience);
router.put("/edit/:id", authMiddleware, editExperience);
router.delete("/delete/:id", authMiddleware, deleteExperience);

module.exports = router;
