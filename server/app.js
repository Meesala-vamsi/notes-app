const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const cors = require("cors");
const CustomError = require("./utils/customError");
const notesRoute = require("./routes/notesRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use("/notes",notesRoute);


app.all("*", (req, res, next) => {
  const error = new CustomError(`Invalid end point ${req.originalUrl}`, 404);
  next(error);
});

app.use(globalErrorController);

module.exports = app;