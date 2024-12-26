const Category = require("../models/category.model");

const addNewCategory = async (req, res) => {
  try {
    const { name, alias } = req.body;

    if (!name || !alias) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const newCategory = new Category({ name, alias });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const fetchAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, alias } = req.body;

  try {
    const updateData = {
      name,
      alias,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
    const existingCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: existingCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const CategoryExists = await Category.findById(id);
    if (!CategoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist.",
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
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
  addNewCategory,
  fetchAllCategories,
  editCategory,
  deleteCategory,
};
