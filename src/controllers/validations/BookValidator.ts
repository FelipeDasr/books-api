import { IValidationResult } from '../../interfaces/validator';
import { IBookRecord } from '../../interfaces/book';
import Validator from './Validator';
import Joi from 'joi';

class BookValidator extends Validator {

    constructor() {
        super(
            {
                title: Joi.string().trim().max(500),
                description: Joi.string().trim().max(2000),
                author: Joi.string().trim().max(150),
                genre: Joi.string().trim().max(25),
                price: Joi.number().positive()
            }
        );
    }

    public completeBook(data: any): IValidationResult<IBookRecord> {
        return { ...this.validate(data, 'required') };
    }

    public partialBook(data: any): IValidationResult<Partial<IBookRecord>> {
        return { ...this.validate(data, 'optional') }
    }

    public id(data: any): IValidationResult<Pick<IBookRecord, 'id'>> {
        return {
            ...this.validate(data, 'required', {
                id: Joi.number().positive().integer()
            })
        }
    }
}

export default new BookValidator();