const express = require('express');
const booksController = require('../controllers/bookController.js');
const validator = require('express-joi-validation').createValidator();
const Joi = require('joi');

const bodySchema = Joi.object({
         title: Joi.string().alphanum().required(),
         author:Joi.string().max(50).required(),
         genre: Joi.string().max(30),
         read: Joi.boolean().required(),
})

const routes = (Book) => {
  const bookRouter = express.Router();
  
  const {getBook, postBook, getBookById,getBookByAuthor, getBookByName, putBook, deleteBook} = booksController(Book);

  bookRouter.route('/books')
      .get(getBook)
      .post(validator.body(bodySchema), postBook);

  bookRouter.route('/books/:bookId')
      .get(getBookById)
      .put(putBook)
      .delete(deleteBook);

  bookRouter.route('/books/:bookAuthor')
      .get(getBookByAuthor);

  bookRouter.route('/books/:bookName')
      .get(getBookByName);     

  return bookRouter;
};

module.exports = routes;
