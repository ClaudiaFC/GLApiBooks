const {response} = require('express');

const booksController = (Book) => {
  const getBook = async (req, res) => {
    const {query}= req;
    const response = await Book.find(query);

    res.json(response);
  };
  const postBook = async (req, res) => {
    const book = new Book(req.body);

    await book.save();
    res.json(book);
  };

  const getBookById = async (req, res) => {
    const {params} = req;
    const response = await Book.findById(params.bookId);

    res.json(response);
  };
  const getBookByAuthor = async (req, res) => {
    const {params} = req;
    const response = await Book.findById(params.bookAuthor);

    res.json(response);
  };
  const getBookByName = async (req, res) => {
    const {params} = req;
    const response = await Book.findByName(params.book);

    res.json(response);
  };
  const putBook = async (req, res) => {
    try {
      const {body} = req;
      const response = await Book.updateOne(
          {
            _id: req.params.bookId,
          },
          {
            $set: {
              title: body.title,
              genre: body.genre,
              author: body.author,
              read: body.read,
            }});
      res.json(response);
    } catch (err) {
      res.status(404).json('book not found');
    }
  };

 const deleteBook= async (req, res) => {
    const id = req.params.bookId;

    await Book.findByIdAndDelete(id);

    res.status(202).json('the book has been deleted OK');
  }
  return {getBook, postBook, getBookById, getBookByAuthor, getBookByName, putBook, deleteBook};
};
module.exports = booksController;
