export class RepositoryError extends Error{
    constructor (message: string, public httpStatus: number){
        super(message);
    }
}