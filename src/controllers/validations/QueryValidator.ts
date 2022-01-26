import { IValidationResult } from '../../interfaces/validator';
import { IBookQuerySchema } from '../../interfaces/query'
import Validator from './Validator';
import Joi from 'joi';

class QueryValidator extends Validator {

    constructor() {
        super({
            author: Joi.string().trim().max(150),
            title: Joi.string().trim().max(500),
            genre: Joi.string().trim().max(25),
            limit: Joi.number().integer().positive(),
            page: Joi.number().integer().positive()
        });
    }

    public query(data: any): IValidationResult<IBookQuerySchema> {
        return { ...this.validate(data, 'optional') };
    }
}

export default new QueryValidator();