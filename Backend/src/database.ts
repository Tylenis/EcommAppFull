import { Pool } from 'pg';
import dotenv from 'dotenv';

//dotenv.config();

if (process.env.ENV !== 'production') {
    dotenv.config();
}

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PSW,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PSW,
    ENV,
    POSTGRES_PORT
} = process.env;

let client: Pool;

if (ENV == 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_PSW,
        port: parseInt(POSTGRES_PORT as string)
    });
    console.log('ENV is test')
}
if (ENV == 'production') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PSW,
    });
    console.log('ENV is production')
}


export { client };
