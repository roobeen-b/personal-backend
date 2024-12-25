const express = require("express");
const {
  fetchAllCategories,
  addNewCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { authMiddleware } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", fetchAllCategories);
router.post("/add", authMiddleware, addNewCategory);
router.put("/edit/:id", authMiddleware, editCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports = router;
