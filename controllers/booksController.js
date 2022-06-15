function booksController(Book) {
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

  function get(req, res) {
    return res.json(req.book);
  }

  return {
    get,
    post,
  };
}

export default booksController;
