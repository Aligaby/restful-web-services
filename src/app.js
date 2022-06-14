import express from "express";
import mongoose from "mongoose";
import { accessDb } from "../config/dbConnect.js";
import Book from "../models/bookModel.js";

const app = express();
const bookRouter = express.Router();

bookRouter.route('/books').get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});
app.use('/api', bookRouter);

app.get("/", (req, res) => {
  res.send(`Welcome to my Nodemon API!`);
});

export default app;
