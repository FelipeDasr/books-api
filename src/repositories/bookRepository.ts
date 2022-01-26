import { RepositoryError } from '../classes/RepositoryError';

import { IBook, IBookRecord, IBooks } from '../interfaces/book';
import { IBookQuerySchema } from '../interfaces/query';
import { Book } from '../entities/bookEntity';

import { paginate, IBookQuerySchemaToORMQuery } from './utils';

class BookRepository {

    public async createNewBook(
        book: IBookRecord
    ): Promise<IBookRecord | RepositoryError> {
        try {
            const bookAlreadyExists = await Book.findOne({
                where: { title: book.title }
            });

            if (bookAlreadyExists) {
                return new RepositoryError('The book already exists', 400);
            }

            const newBook = await Book.create(book);
            return newBook.toJSON();
        } catch (e) {
            return new RepositoryError('Error when trying to create a new book', 500);
        }
    }

    public async getBooks(
        query: IBookQuerySchema
    ): Promise<IBooks | RepositoryError> {

        try {
            const books = await Book.findAndCountAll(
                paginate(
                    IBookQuerySchemaToORMQuery(query),
                    query.page,
                    query.limit
                )
            );

            const booksToJson = books.rows.map(book => book.toJSON())

            return {
                books: booksToJson,
                totalRecords: books.count,
                records: booksToJson.length
            }
        }
        catch (e) {
            return new RepositoryError('Error when trying to get the books', 500);
        }
    }

    public async getBookById(
        id: number
    ): Promise<IBookRecord | RepositoryError> {
        try {
            const book = await Book.findByPk(id);
            return book ? book.toJSON() :
                new RepositoryError("Book does not exist", 400);
        }
        catch (e) {
            return new RepositoryError('Error when trying to get the book', 500);
        }
    }

    public async updateBook(
        id: number, data: Partial<IBook>
    ): Promise<IBookRecord | RepositoryError> {
        try {
            const book = await Book.findByPk(id);
            if (!book) return new RepositoryError("Book does not exist", 400);

            const updatedBook = await book.update(data);
            return updatedBook.toJSON();
        }
        catch (e) {
            return new RepositoryError('Error when trying to update the book', 500);
        }
    }

    public async deleteBook(id: number): Promise<IBookRecord | RepositoryError> {
        try {
            const book = await Book.findByPk(id);
            if (!book) return new RepositoryError("Book does not exist", 400);

            await book.destroy();
            return book.toJSON();
        }
        catch (e) {
            return new RepositoryError('Error when trying to delete the book', 500);
        }
    }

}

export = new BookRepository();