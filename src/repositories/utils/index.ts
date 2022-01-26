import { IBookQuerySchema } from "../../interfaces/query";
import { Op } from "sequelize";

function paginate(
    query: any, page_: number = 0, limit_: number = 50
): any {

    const invalidLimit = (limit_ < 0 || limit_ > 100);
    const invalidPage = (page_ <= 0);

    const limit = invalidLimit ? 50 : Math.floor(limit_);
    const page = invalidPage ? 0 : Math.floor(page_)-1;

    const offset = limit * page;

    return {
        ...query,
        limit,
        offset
    }
}

function IBookQuerySchemaToORMQuery(query: IBookQuerySchema): any {

    const ORMQuery: any = {
        order: [['createdAt', 'DESC']],
        where: {}
    };

    if (query.title) {
        ORMQuery.where.title = { [Op.like]: `%${query.title}%` }
    }
    if (query.genre) {
        ORMQuery.where.genre = { [Op.like]: `%${query.genre}%` }
    }
    if (query.author) {
        ORMQuery.where.author = { [Op.like]: `%${query.author}%` }
    }

    return ORMQuery;
}

export {
    IBookQuerySchemaToORMQuery,
    paginate
}