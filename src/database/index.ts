import { Sequelize } from "sequelize";

const DBConnection = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

export { DBConnection }