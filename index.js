require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors")
const mongoose = require("mongoose");
const taskRouter = require("./router/taskRouter");

app.use(express.json())
app.use(cors())
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "home page" });
});

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

const server = async (req, res) => {
  try {
    await mongoose.connect(process.env.URL, { dbName: "taskServer" });
    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
