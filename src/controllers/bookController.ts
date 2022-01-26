import { RepositoryError } from '../classes/RepositoryError';

import bookRepository from '../repositories/bookRepository';
import QueryValidator from './validations/QueryValidator';
import BookValidator from './validations/BookValidator';

import { Request, Response } from 'express';

class BookController {

    public async newBook(req: Request, res: Response): Promise<Response> {

        const { value, error } = BookValidator.completeBook(req.body);
        if (error) return res.status(422).json(error);

        const creationResult = await bookRepository.createNewBook(value);

        if (creationResult instanceof RepositoryError) {
            return res.status(creationResult.httpStatus).json({
                msg: creationResult.message
            });
        }

        return res.status(201).json(creationResult);
    }

    public async getBookById(req: Request, res: Response): Promise<Response> {

        const { value, error } = BookValidator.id(req.params); // => { id: 2 } 
        if (error) return res.status(422).json(error);

        const bookResult = await bookRepository.getBookById(value.id);

        if (bookResult instanceof RepositoryError) {
            return res.status(bookResult.httpStatus).json({
                msg: bookResult.message
            })
        }

        return res.json(bookResult);
    }

    public async getBooks(req: Request, res: Response): Promise<Response> {

        const { value, error } = QueryValidator.query(req.query);
        if (error) return res.status(422).json(error);

        const booksResult = await bookRepository.getBooks(value);

        if (booksResult instanceof RepositoryError) {
            return res.status(booksResult.httpStatus).json({
                msg: booksResult.message
            });
        }

        return res.status(200).json(booksResult);
    }

    public async updateBook(req: Request, res: Response): Promise<Response> {

        const bookId = BookValidator.id(req.params);
        if (bookId.error) return res.status(422).json(bookId.error);

        const newBook = BookValidator.partialBook(req.body);
        if (newBook.error) return res.status(422).json(newBook.error);

        const updatedBookResult = await bookRepository.updateBook(
            bookId.value.id,
            newBook.value
        );

        if (updatedBookResult instanceof RepositoryError) {
            return res.status(updatedBookResult.httpStatus).json({
                msg: updatedBookResult.message
            });
        }

        return res.status(200).json(updatedBookResult);
    }

    public async deleteBook(req: Request, res: Response): Promise<Response> {
        const { value, error } = BookValidator.id(req.params);
        if (error) return res.status(422).json(error);

        const deletedBook = await bookRepository.deleteBook(value.id);

        if (deletedBook instanceof RepositoryError) {
            return res.status(deletedBook.httpStatus).json({
                msg: deletedBook.message
            });
        }

        return res.status(200).json({ deletedBook });
    }
}

export default new BookController;
