const mongoose = require("mongoose");
const Skill = require("../models/Skill.model");

const addNewSkill = async (req, res) => {
  try {
    const { name, iconName } = req.body;

    if (!name || !iconName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const newSkill = new Skill({ name, iconName });

    await newSkill.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully.",
      data: newSkill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const fetchAllSkills = async (req, res) => {
  try {
    const allSkills = await Skill.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: allSkills,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const editSkill = async (req, res) => {
  const { id } = req.params;
  const { name, iconName } = req.body;

  try {
    const updateData = {
      name,
      iconName,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    const existingSkill = await Skill.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: existingSkill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skillExists = await Skill.findById(id);
    if (!skillExists) {
      return res.status(404).json({
        success: false,
        message: "Skill does not exist.",
      });
    }

    await Skill.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { addNewSkill, fetchAllSkills, editSkill, deleteSkill };
