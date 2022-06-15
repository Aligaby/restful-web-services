function booksController(Book) {
  const getBooks = (req, res, next) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      if (books) {
        req.book = books;
        return next();
      }
    });
  };

  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }

    book.save();
    res.status(201);

    return res.json(book);
  }

  function getAll(req, res) {
    const returnBooks = req.book.map((book) => {
      const newBook = book.toJSON();
      newBook.links = {};
      newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
      return newBook;
    });

    return res.json(returnBooks);
  }

  const modifyBook = (req, res, next) => {
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
  };

  function get(req, res) {
    return res.json(req.book);
  }

  function put(req, res) {
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
  }

  function patch(req, res) {
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
  }

  function deleted(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.status(200).send(`This ID ${req.params.bookId} was deleted`);
    });
  }

  return {
    getBooks,
    getAll,
    post,
    modifyBook,
    get,
    put,
    patch,
    deleted,
  };
}

export default booksController;
