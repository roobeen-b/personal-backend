const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: String,
  iconName: String,
});

const Skill = mongoose.model("Skill", SkillSchema);
module.exports = Skill;
