const { imageUploadUtil } = require("../helpers/cloudinary");
const Project = require("../models/Project.model");

const handleImageUpload = async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + base64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const addNewProject = async (req, res) => {
  const { title, description, liveHref, codeHref, thumbnail, category } =
    req.body;

  try {
    const newProject = new Project({
      title,
      description,
      liveHref,
      codeHref,
      thumbnail,
      category,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const result = await Project.find({});

    res.status(200).json({
      success: true,
      message: "Successful.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, liveHref, codeHref, thumbnail, category } =
    req.body;

  try {
    const updateData = {
      title,
      description,
      liveHref,
      codeHref,
      thumbnail,
      category,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    const existingProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: existingProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const projectExists = await Project.findById(id);
    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist.",
      });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
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
  handleImageUpload,
  addNewProject,
  getAllProjects,
  editProject,
  deleteProject,
};
