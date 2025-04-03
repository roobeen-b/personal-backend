require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth.route");
const projectRouter = require("./routes/project.route");
const skillRouter = require("./routes/skill.route");
const categoryRouter = require("./routes/category.route");
const experienceRouter = require("./routes/experience.route");

mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_UI_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/skill", skillRouter);
app.use("/api/category", categoryRouter);
app.use("/api/experience", experienceRouter);

app.listen(PORT, () => {
  console.log("Server running at port: ", PORT);
});
