const Experience = require("../models/experience.model");

const addNewExperience = async (req, res) => {
  try {
    const { position, company, worksDone, startDate, endDate } = req.body;

    if (!position || !company || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const newExperience = new Experience({
      position,
      company,
      worksDone,
      startDate,
      endDate,
    });

    await newExperience.save();

    res.status(201).json({
      success: true,
      message: "Experience added successfully.",
      data: newExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const fetchAllExperiences = async (req, res) => {
  try {
    const allExperiences = await Experience.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: allExperiences,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const editExperience = async (req, res) => {
  const { id } = req.params;
  const { position, company, worksDone, startDate, endDate } = req.body;

  try {
    const updateData = {
      position,
      company,
      worksDone,
      startDate,
      endDate,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    const existingExperience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!existingExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      data: existingExperience,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    const ExperienceExists = await Experience.findById(id);
    if (!ExperienceExists) {
      return res.status(404).json({
        success: false,
        message: "Experience does not exist.",
      });
    }

    await Experience.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = {
  addNewExperience,
  fetchAllExperiences,
  editExperience,
  deleteExperience,
};
