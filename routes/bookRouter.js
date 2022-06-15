import express from "express";
import Book from "../models/bookModel.js";
import booksController from "../controllers/booksController.js";

function routes() {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.use("/books", controller.getBooks);
  bookRouter.route("/books").get(controller.getAll).post(controller.post);

  bookRouter.use("/books/:bookId", controller.modifyBook);
  bookRouter
    .route("/books/:bookId")
    .get(controller.get)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleted);

  return bookRouter;
}

export default routes();
