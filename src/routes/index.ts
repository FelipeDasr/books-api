import express from 'express';
const Router = express.Router();

import bookController from '../controllers/bookController';

Router.post('/book', bookController.newBook);

Router.get('/book/:id', bookController.getBookById);
Router.get('/books', bookController.getBooks);

Router.patch('/book/:id/update', bookController.updateBook);
Router.delete('/book/:id/delete', bookController.deleteBook);

export default Router;