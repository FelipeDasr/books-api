import {
    IPartialSchema, IValidationResult, IValidationErrorItem
} from '../../interfaces/validator';

import Joi from 'joi'

class Validator {

    constructor(protected partialSchema: IPartialSchema) { }

    protected validate(
        data: any, presence: 'optional' | 'required', schema: IPartialSchema = this.partialSchema
    ) {
        const bookSchema: Joi.ObjectSchema = Joi.object(schema);

        const { value, error } = bookSchema.validate(data, {
            abortEarly: false,
            presence
        });

        return {
            value,
            error: this.getErrors(error)
        }
    }

    private getErrors(errors: Joi.ValidationError | undefined): IValidationErrorItem[] | undefined {

        if (!errors) return errors;

        const formattedErrors = errors.details.map(err => {
            return {
                msg: err.message,
                field: err.path[0]
            }
        });

        return formattedErrors;
    }

}

export default Validator;