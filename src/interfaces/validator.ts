import Joi from 'joi';

export interface IValidationErrorItem {
    msg: string,
    field: string | number
}

export interface IPartialSchema {
    [key: string]: Joi.AnySchema
}

export interface IValidationResult<T>{
    value: T;
    error: IValidationErrorItem[] | undefined
}