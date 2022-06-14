import express from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import Book from "../models/bookModel.js";
import bookRouter from "../routes/bookRouter.js";

const app = express();

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get("/", (req, res) => {
  res.send(`Welcome to my Nodemon API!`);
});

export default app;
