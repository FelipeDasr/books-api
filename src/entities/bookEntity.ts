import { DataTypes, Model } from 'sequelize';
import { DBConnection } from '../database';

class Book extends Model { };

Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(2000),
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize: DBConnection,
    modelName: 'books'
});

export { Book }