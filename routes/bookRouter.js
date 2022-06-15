import express from "express";
import Book from "../models/bookModel.js";

function routes() {
  const bookRouter = express.Router();

  bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
  
  bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.status(201).json(book);
    });
  });
  
  bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
  
    return res.json(book);
  })
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

  bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.status(201).json(book);
    });
  })
  .put((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();

      return res.status(201).json(book);
    });
  });

  return bookRouter;
}

export default routes();