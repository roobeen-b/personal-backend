const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    liveHref: String,
    codeHref: {
      type: String,
      required: true,
    },
    thumbnail: String,
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
