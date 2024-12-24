const express = require("express");
const {
  handleImageUpload,
  addNewProject,
  editProject,
  deleteProject,
  getAllProjects,
} = require("../controllers/project.controller");
const { upload } = require("../helpers/cloudinary");
const { authMiddleware } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/image-upload",
  authMiddleware,
  upload.single("thumbnail"),
  handleImageUpload
);
router.get("/", getAllProjects);
router.post("/add", authMiddleware, addNewProject);
router.put("/edit/:id", authMiddleware, editProject);
router.delete("/delete/:id", authMiddleware, deleteProject);

module.exports = router;
