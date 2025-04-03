const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    worksDone: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
