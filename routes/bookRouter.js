import express from "express";

function routes() {
  const bookRouter = express.Router();

  bookRouter.route('/books').get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });
  
  bookRouter.route('/books/:bookId').get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.status(201).json(book);
    });
  });
  
  bookRouter.route('/books').post((req, res) => {
    const book = new Book(req.body);
    book.save();
  
    return res.json(book);
  }).get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

  return bookRouter;
}

export default routes;