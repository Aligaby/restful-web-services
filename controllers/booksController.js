function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    book.save();

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
