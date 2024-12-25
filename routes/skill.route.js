const express = require("express");
const {
  fetchAllSkills,
  addNewSkill,
  editSkill,
  deleteSkill,
} = require("../controllers/skill.controller");
const { authMiddleware } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", fetchAllSkills);
router.post("/add", authMiddleware, addNewSkill);
router.put("/edit/:id", authMiddleware, editSkill);
router.delete("/delete/:id", authMiddleware, deleteSkill);

module.exports = router;
