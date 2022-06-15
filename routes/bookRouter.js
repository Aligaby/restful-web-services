import express from "express";
import Book from "../models/bookModel.js";
import booksController from "../controllers/booksController.js";

function routes() {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.use("/books", (req, res, next) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      if (books) {
        req.book = books;
        return next();
      }
    });
  });

  bookRouter.route("/books").get(controller.get).post(controller.post);

  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter
    .route("/books/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });

      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).send(`This ID ${req.params.bookId} was deleted`);
      });
    });

  return bookRouter;
}

export default routes();
