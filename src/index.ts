if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

import { DBConnection } from './database'
import Router from './routes';

import express from 'express';
const app = express();

(async () => {
    try {

        await DBConnection.authenticate();
        await DBConnection.sync();

        console.log('DATABASE OK');

        app.use(express.json());
        app.use(Router);

        app.listen(3000, () => {
            console.log('API IS RUNNING AT: http://127.0.0.1:3000');
        });

    }
    catch(e) {
        console.log(e);
    }
})();