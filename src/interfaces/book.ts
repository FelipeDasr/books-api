export interface IBook {
    description: string;
    author: string;
    title: string;
    genre: string;
    price: number;
}

export interface IBookRecord extends IBook {
    createdAAt: string,
    updatedAt: string,
    id: number
}

export interface IBooks {
    books: IBookRecord[];
    totalRecords: number[];
    records: number;
}